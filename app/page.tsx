'use client';

import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CreateNewTask from '@/components/CreateNewTask';
import SidebarMenu from '@/components/SidebarMenu';
import Task from '@/components/Task';

import { cookie } from '@/fonts';

export type TaskType = {
  _id: string
  taskText: string
  taskStatus: string
}

export default function Home() { 

  const [tasks, setTasks] = useState<TaskType[]>([])

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks')
      const result = await response.json()
      
      if (Array.isArray(result)) {
        setTasks(result)  
      } else {
        console.error('Invalid response:', result)
      }
    } 
    catch (err) {
      console.error('Failed to fetch tasks:', err)
    }
  }

  useEffect(()=>{
    fetchTasks()
  }, [])

  const [moveIn, setMoveIn] = useState(false);

  const [showUndone, setShowUndone] = useState(true);

  return (
    <>
      <Header setMoveIn={setMoveIn}/>

      <main className='w-full text-2xl
                        flex flex-col gap-4 items-center'>
        <SidebarMenu moveIn={moveIn} setMoveIn={setMoveIn} />

        <div id='overlay'
             className={`bg-gray-800 opacity-50 fixed inset-0 z-9
                        ${moveIn? '' : 'hidden'} duration-450 ease-in `}
              onClick={()=>setMoveIn(false)}
        ></div>
        
        <CreateNewTask fetchTasks={fetchTasks} />

        <div className='w-19/20 px-1 py-4 flex flex-row gap-1 border-b-[0.4px] border-gray-400 [&>span]:hover:cursor-pointer'>
          <span
          className={`text-center w-1/2 text-xl lg:text-2xl
                  ${showUndone?'text-black font-bold underline underline-offset-6': 'text-gray-500'} duration-100 ease-out`}
          onClick={()=>setShowUndone(true)}
          >
            In Progress 🚧🔨
          </span>

          <span 
            className={`text-center w-1/2 text-xl lg:text-2xl
                    ${showUndone? 'text-gray-500' : 'text-black font-bold underline underline-offset-6'} duration-100 ease-out`}
            onClick={()=>setShowUndone(false)}
          >
            Done  ✅
          </span>
        </div>

        {showUndone?
          tasks.filter(task => task.taskStatus==='in-progress').length>0?
            tasks.filter(task => task.taskStatus==='in-progress')
                .map(task => 
                  <Task key={`undoneTask${task._id}`} _id={task._id} taskText={task.taskText} taskStatus={task.taskStatus} fetchTasks={fetchTasks} />
                )
          :
              <div 
                  className='w-2/3 min-w-85 max-w-300 text-start text-xl md:text-[22px] text-gray-500 
                            bg-gray-200 p-8 rounded-xl'
              >
                <span className={`text-orange-500 text-3xl md:text-4xl p-2 ${cookie.className}`}>
                  Create
                </span>tasks and they&apos;ll appear here...
              </div>

        :

          tasks.filter(task => task.taskStatus==='done').length>0?
            tasks.filter(task => task.taskStatus==='done')
                .map(task => 
                  <Task key={`doneTask${task._id}`} _id={task._id} taskText={task.taskText} taskStatus={task.taskStatus} fetchTasks={fetchTasks} />
                )
          :
              <div 
                  className='w-2/3 min-w-85 max-w-300 text-start text-xl md:text-[22px] text-gray-500 
                            bg-gray-200 p-8 rounded-xl'
              >
                <span className={`text-orange-500 text-3xl md:text-4xl p-2 ${cookie.className}`}>
                  Complete
                </span>tasks and they&apos;ll appear here...
              </div>

        }

      </main>

      <Footer />
    </>
  );
}