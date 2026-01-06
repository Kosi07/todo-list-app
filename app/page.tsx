'use client';

import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CreateNewTask from '@/components/CreateNewTask';
import SidebarMenu from '@/components/SidebarMenu';
import Task from '@/components/Task';

import { cookie } from '@/fonts';
import Overlay from '@/components/Overlay';

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

  const [selected, setSelected] = useState(0) //All-0, Active-1, Done-2

  return (
    <>
      <Header setMoveIn={setMoveIn}/>

      <main className='w-full text-2xl
                        flex flex-col gap-4 items-center'>
        <SidebarMenu moveIn={moveIn} setMoveIn={setMoveIn} />

        <Overlay statefulVar={moveIn} func={setMoveIn} />
        
        <CreateNewTask fetchTasks={fetchTasks} />

        <div className='w-full flex flex-row justify-center'>
          <div className='bg-gray-200/30 rounded-3xl px-10 py-3 flex flex-row justify-center gap-10 border-b-[0.1px] border-gray-300/30 [&>span]:hover:cursor-pointer'>
            <div
              className={`text-center text-xl lg:text-2xl px-6 py-2 rounded-2xl
                      hover:cursor-pointer hover:text-gray-800
                      ${selected===0?'text-black font-bold bg-white': 'text-gray-500'} duration-100 ease-out`}
              onClick={()=>setSelected(0)}
            >
              All
            </div>

            <div
              className={`text-center text-xl lg:text-2xl px-4 py-2 rounded-2xl
                        hover:cursor-pointer hover:text-gray-800
                      ${selected===1?'text-black font-bold bg-white': 'text-gray-500'} duration-100 ease-out`}
              onClick={()=>setSelected(1)}
            >
              Active 
            </div>

            <div 
              className={`text-center text-xl lg:text-2xl px-4 py-2 rounded-2xl
                        hover:cursor-pointer hover:text-gray-800
                      ${selected===2? 'text-black font-bold bg-white' : 'text-gray-500'} duration-100 ease-out`}
              onClick={()=>setSelected(2)}
            >
              Done  
            </div>
          </div>
        </div>

        {selected===1?
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
          selected===2?
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
          :
            //selected = 0
            tasks.length > 0?
              tasks.map(task => 
                      <Task key={`doneTask${task._id}`} _id={task._id} taskText={task.taskText} taskStatus={task.taskStatus} fetchTasks={fetchTasks} />
                    )
            :
              <div 
                className='w-2/3 min-w-85 max-w-300 text-center text-xl md:text-[22px] text-gray-500 
                              bg-gray-200 p-8 rounded-xl'
              >
                No tasks yet...
              </div>

        }

      </main>

      <Footer />
    </>
  );
}