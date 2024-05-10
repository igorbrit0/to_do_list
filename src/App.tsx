import React,{useState} from 'react'

// components
import Header from './components/Header'
import Footer from './components/Footer'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Modal from './components/Modal'
// CSS
import styles from './App.module.css'

// Interface
import {ITask} from './interfaces/Task'

function App() {
  
  const [taskList,setTaskList]=useState<ITask[]>([])
  const [taskToUpdate,setTaskToUpdate]=useState<ITask|null>(null)

  const deleteTask=(id:number)=>{
    setTaskList(
      taskList.filter(task=>{
        return task.id !==id
      })
    )
  }


  const hideOrshowModal=(display:boolean)=>{
    const modal=document.getElementById('modal')
    if (display){
      modal!.classList.remove('hide')
    }else {
      modal!.classList.add('hide')
    }
  }

  const editTask=(task:ITask):void=>{
    hideOrshowModal(true)
    setTaskToUpdate(task)

  }

  const updateTask=(id: number,title:string,difficulty:number)=>{
    const updatedTask:ITask={id,title,difficulty}
    const updatedItens=taskList.map((task)=>{
      return task.id===updatedTask.id ? updatedTask:task
    })
    setTaskList(updatedItens)
    hideOrshowModal(false)
  }

  return (
    <div>
      <Modal title='Editar Tarefa'children={<TaskForm btnText='Editar' taskList={taskList} task={taskToUpdate} handleUpdate={updateTask}/>}/>
      <Header/>
      <main className={styles.main}>
        <div>
        <h2>O que você vai fazer?</h2>
        <TaskForm btnText='Criar Tarefa' taskList={taskList} setTaskList={setTaskList}/>
        </div>
        <div>
        <h2>Suas tarefas:</h2>
        <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
