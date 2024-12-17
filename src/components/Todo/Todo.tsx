import { useState } from 'react'
import { update_todo } from '../../api/endpoints'
import classes from './Todo.module.scss'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { ITodo } from '../../App'

const Todo = ({id, todo_name, deleteTodo, completed, setTodos: setTodos}:{id:string,todo_name: string, deleteTodo:(id: string) => Promise<void>, completed:boolean, setTodos:React.Dispatch<React.SetStateAction<ITodo[]>>}) => {
  const [isChecked, setChecked] = useState<boolean>(completed)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleDelete = () =>{
  deleteTodo(id)
}

const handleComplete = async() => {
  setIsRemoving(true)
  setTimeout(async () => {
    await update_todo(id, !isChecked);
    setChecked(!isChecked);

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !isChecked } : todo
      )
    );

    setIsRemoving(false)
  }, 200)
}

  return(
  <div   className={`${classes.todo} ${isRemoving ? classes.slide_up : ""}`}>
    <div className={classes.todo_container}>
       <div className={classes.sub_container}>
       <input type="checkbox" checked={isChecked} onClick={handleComplete} className={classes.icon}/>
       <h3 className={classes.task}>{todo_name}</h3>
       </div>
        <RiDeleteBack2Line size='20px' onClick={handleDelete} color='red' className={classes.icon}/>
    </div>
  </div>
)
}
export default Todo