import { useEffect, useState } from 'react'
import classes from './App.module.scss'
import TodoList from './components/TodoList/TodoList'
import { create_todo, delete_todo, get_todos } from './api/endpoints'
import AddTodo from './components/Todo/AddTodo'

export interface ITodo {
  id: string;
  todo_name: string;
  completed: boolean;
}
function App() {
const [todos, setTodos] = useState<ITodo[]>([])

const fetchTodos = async () => {
  const todos = await get_todos()
  setTodos(todos)
  console.log(todos)
}

useEffect(() => { fetchTodos() },[])

const addTodo = async(todo_name: string) => {
  const todo = await create_todo(todo_name)
  setTodos([todo, ...todos])
}

const deleteTodo = async (id: string) => {
  await delete_todo(id.toString())
  setTodos(todos.filter((todo) => todo.id!==id))
}

const getCompletedTodos = (todos:ITodo[]) => {
  return todos.filter((todo) => todo.completed === true)
}

const getPendingTodos = (todos:ITodo[]) => {
  return todos.filter((todo) => todo.completed === false)
}

  return (
    <div className={classes.app}>
      <div className={classes.app_container}>
      <h1 className={classes.title}>Todo App</h1>
      <AddTodo addToDo={addTodo} />
      {getPendingTodos(todos).length > 0 && <div className={classes.completed_tasks}>Pending</div>}
      <TodoList todos={getPendingTodos(todos)} deleteTodo={deleteTodo} setTodos={setTodos}/>
      {getCompletedTodos(todos).length > 0 && <div className={classes.completed_tasks}>Completed</div>}
      <TodoList todos={getCompletedTodos(todos)} deleteTodo={deleteTodo} setTodos={setTodos}/>
      </div>
    </div>
  )
}

export default App
