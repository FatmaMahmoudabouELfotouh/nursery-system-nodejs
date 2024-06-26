const Class = require("./../Models/ClassModel");

exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find();
    res.status(200).json({ data: classes });
  } catch (error) {
    next(error);
  }
};

exports.insertClass = async (req, res, next) => {
  try {
    const { name, supervisor, children } = req.body;
    const newClass = new Class({
      name,
      supervisor,
      children,
    });
    await newClass.save();
    res.status(201).json({ data: newClass });
  } catch (error) {
    next(error);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, supervisor, children } = req.body;
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, supervisor, children },
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({ data: updatedClass });
  } catch (error) {
    next(error);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    res
      .status(200)
      .json({ message: "Class deleted successfully", data: deletedClass });
  } catch (error) {
    next(error);
  }
};

exports.getClassById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const classData = await Class.findById(id);
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({ data: classData });
  } catch (error) {
    next(error);
  }
};

exports.deleteClassById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    res
      .status(200)
      .json({ message: `Class with id ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};

exports.getClassChildInfo = async (req, res, next) => {
  try {
    const classId = req.params.id;
    const classInfo = await Class.findById(classId);
    if (!classInfo) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.status(200).json({ children: classInfo.children });
  } catch (error) {
    next(error);
  }
};

exports.getClassTeacherInfo = async (req, res, next) => {
  try {
    const classId = req.params.id;
    const classInfo = await Class.findById(classId);
    if (!classInfo) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.status(200).json({ teacher: classInfo.supervisor });
  } catch (error) {
    next(error);
  }
};

