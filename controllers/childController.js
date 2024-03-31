const Childerns = require("../Models/childModel");

exports.getAllChildren = async (req, res, next) => {
  try {
    const data = await Childerns.find({});
    if (!data || data.length === 0) {
      throw new Error("Children not found");
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};

exports.addChild = async (req, res, next) => {
  try {
    const { _id, fullname, age, level, address } = req.body;

    const newChild = new Childerns({
      _id,
      fullname,
      age,
      level,
      address,
    });
    await newChild.save();
    res.status(201).json({ data: newChild });
  } catch (error) {
    next(error);
  }
};

exports.updateChild = async (req, res, next) => {
  try {
    const { _id, fullname, age, level, address } = req.body;

  
    const existingChild = await Childerns.findById(_id);
    if (!existingChild) {
      return res.status(404).json({ error: "Child not found" });
    }

    // Prepare update fields
    let updateFields = {};
    if (fullname) updateFields.fullname = fullname;
    if (age) updateFields.age = age;
    if (level) updateFields.level = level;
    if (address) updateFields.address = address;

    // Update the child
    const updatedChild = await Childerns.findByIdAndUpdate(_id, updateFields, { new: true });

    // Check if the update was successful
    if (!updatedChild) {
      return res.status(500).json({ error: "Failed to update child" });
    }

    res.status(200).json({ data: updatedChild });
  } catch (error) {
    next(error);
  }
};

exports.deleteChild = async (req, res, next) => {
  try {
    const deletedChild = await Childerns.findByIdAndDelete(req.body._id);
    if (!deletedChild) {
      return res.status(404).json({ error: "Child not found" });
    }
    res.status(200).json({ message: "Delete Successfuly", data: deletedChild });
  } catch (error) {
    next(error);
  }
};

exports.findChildById = async (req, res, next) => {
  try {
    const data = await Childerns.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Child not found" });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};


exports.deleteChild = async (req, res, next) => {
  try {
    const deletedChild = await Childerns.findByIdAndDelete(req.body._id);
    if (!deletedChild) {
      return res.status(404).json({ error: "Child not found" });
    }
    res.status(200).json({ message: "Delete Successfuly", data: deletedChild });
  } catch (error) {
    next(error);
  }
};

exports.findChildById = async (req, res, next) => {
  try {
    const data = await Childerns.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "child not exist" });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};
