import { ITodo } from "../../App"
import Todo from "../Todo/Todo"
import classes from "./TodoList.module.scss"


const TodoList = ({todos, deleteTodo, setTodos}: {todos: ITodo[], deleteTodo:(id: string) => Promise<void>, setTodos:React.Dispatch<React.SetStateAction<ITodo[]>>}) => {
  return(
    <div className={classes.todo_list}>
      {todos.map((todo) => {
        return <Todo key={todo.id} id={todo.id} todo_name={todo.todo_name} deleteTodo={deleteTodo} completed={todo.completed} setTodos={setTodos}/>
      })}
    </div>
  )

}

export default TodoList