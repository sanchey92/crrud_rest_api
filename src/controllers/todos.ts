import {RequestHandler} from "express";
import Todo from "../models/todo";

const TODOS: Todo[] = [];

const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  res.status(201).json({message: 'Created a new Item', createdTodo: newTodo})
};

const getTodos: RequestHandler = (req, res, next) => {
  res.json({todos: TODOS})
};

const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex(el => el.id === todoId);

  if (!todoIndex) throw new Error('Todo not found');
  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
  res.json({message: 'Updated!', updatedTodo: TODOS[todoIndex]})
};

const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex(el => el.id === todoId);

  if (!todoIndex) throw new Error('Todo item not found');
  TODOS.splice(todoIndex, 1);
  res.json({message: 'Todo deleted!'})
};

export {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
}
