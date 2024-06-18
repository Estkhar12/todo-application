import Todo from "../models/todo.js";


// Create Todo
export const CreateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({
      userId: req.userId,
      title,
      description,
    });
    const saveTodo = await todo.save();
    res.status(201).json({ message: "Todo Created!", data: saveTodo });
  } catch (error) {
    res.status(400).send("Error creating todo");
  }
};

// Get Todos
export const getTodos = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;
    const todos = await Todo.find({
      userId: req.userId,
      title: { $regex: search, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).send("Error fetching todos");
  }
};

// Get Todo by ID
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
    if (!todo) return res.status(404).send("Todo not found");
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).send("Error fetching todo");
  }
};

// Update Todo
export const updateTodo = async (req, res) => {
  try {
    const { title, description, pinned, favorite } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, description, pinned, favorite },
      { new: true }
    );
    if (!todo) return res.status(404).send("Todo not found");
    res.json(todo);
  } catch (error) {
    res.status(400).send("Error updating todo");
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!todo) return res.status(404).send("Todo not found");
    res.send("Todo deleted");
  } catch (error) {
    res.status(400).send("Error deleting todo");
  }
};
