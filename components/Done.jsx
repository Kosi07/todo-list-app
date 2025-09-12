'use client';

import Task from './Task';
import { useState } from 'react';

const Done = ({ doneTasks, undoneTasks, setUndoneTasks, setDoneTasks }) => {
  return (
     <div className='my-8 flex flex-col items-center gap-3'>
        <span className='text-start w-full text-2xl lg:text-3xl text-gray-500 ml-4'>Done  ✅</span>
        <div className='completed-tasks flex flex-col items-center gap-4 w-6/10 min-w-[340px]'>
            {
              doneTasks!==null && doneTasks.length>0?
                 doneTasks.map((text, index) => <Task key={index} id={`Task${index+1}`} taskText={text} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} doneTasks={doneTasks} setDoneTasks={setDoneTasks} />)
              : 
                 <div className='text-start w-full text-xl md:text-2xl text-gray-700 ml-4'>Complete tasks and they'll appear here...</div>}
        </div>
    </div>
  )
}
export default Done;