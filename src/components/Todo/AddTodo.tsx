import { useState } from 'react'
import classes from './Todo.module.scss'

const AddTodo = ({addToDo}: {addToDo: (todo_name: string) => Promise<void>}) => {
  
  const [input, setInput] = useState<string>('')

  const handleAdd = () => {
    addToDo(input)
    setInput('')
  }
  
  return (
    <div className={classes.add_todo}>
      <input type='text' className={classes.add_input} onChange={(e)=> setInput(e.target.value)} placeholder='Enter Task'/>
      <button className={classes.add_button} onClick={handleAdd}>+</button>
    </div>
  )
}
export default AddTodo