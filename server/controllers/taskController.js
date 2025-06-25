import Task from "../models/Task.js";

// GET /tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = req.user.role === "manager"
      ? await Task.find().populate("assignedTo", "username email")
      : await Task.find({ assignedTo: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /tasks (manager only)
export const createTask = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      status,
      assignedTo,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /tasks/:id (user can update only own tasks)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Si l'utilisateur n'est pas manager et la tâche ne lui appartient pas
    if (req.user.role !== "manager" && task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    const { title, description, status } = req.body;

    // si l'utilisateur est simple user, il ne peut modifier que le statut
    if (req.user.role !== "manager") {
      task.status = status;
    } else {
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
    }

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /tasks/:id (manager only)
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
