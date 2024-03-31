const bcrypt = require("bcrypt");
const path = require("path");
const upload = require("./../MiddleWares/multerConfig");
const Teachers = require("./../Models/teacherModel");

exports.getAllTeachers = async (req, res, next) => {
  try {
    const data = await Teachers.find({});
    if (!data) {
      throw new Error(" teachers not found");
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};

exports.addTeacher = async (req, res, next) => {
  try {
    console.log(req.body);
    const {fullname, password, email} = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const file = req.file.filename;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new Teachers({
      fullname: fullname,
      password: hashedPassword,
      email: email,
      image: file || "not selected",
    });
    const insertedTeacher = await newTeacher.save();
    res.status(201).json({ data: insertedTeacher });
  } catch (error) {
    next(error);
  }
};
exports.updateTeacher = async (req, res, next) => {
  try {
    const { fullname, password, email } = req.body;
    const teacherId = req.params.id; 

    let updateFields = {};
    if (req.file && req.file.filename) {
      updateFields.image = req.file.filename;
    }

    if (fullname) updateFields.fullname = fullname;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }
    if (email) updateFields.email = email;

    const updatedTeacher = await Teachers.findByIdAndUpdate(
      teacherId, 
      updateFields,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json({ data: updatedTeacher });
  } catch (error) {
    next(error);
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    const deletedTeacher = await Teachers.findByIdAndDelete(req.body.id);
    if (!deletedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res
      .status(200)
      .json({ message: "Delete Successfuly", data: deletedTeacher });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { _id, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

   
    await Teachers.findByIdAndUpdate(_id, { password: hashedPassword });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.findTeacherById = async (req, res, next) => {
  try {
    const data = await Teachers.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "not found it" });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};
