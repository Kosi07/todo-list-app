'use client';

import Task from './Task';
import { cookie } from '@/hooks/useSpecialFonts';


const Done = ({ doneTasks, undoneTasks, setUndoneTasks, setDoneTasks }) => {
  return (
     <div className='my-8 w-full flex flex-col items-center gap-3'>
        <span className='text-start w-7/10 text-2xl lg:text-3xl text-gray-500'>Done  ✅</span>
        <div className='completed-tasks flex flex-col items-center gap-4 w-6/10 min-w-[340px]'>
            {
              doneTasks!==null && doneTasks.length>0?
                 doneTasks.map((text, index) => <Task key={`doneTask${index+1}`} index={index} taskText={text} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} doneTasks={doneTasks} setDoneTasks={setDoneTasks} isDone={true} />)
              : 
                 <div className='text-start w-full text-xl md:text-[22px] text-gray-500
                                 bg-gray-100 p-8 rounded-xl'><span className={`text-orange-500 text-3xl md:text-4xl p-2 ${cookie.className}`}>Complete</span>tasks and they'll appear here...</div>}
        </div>
    </div>
  )
}
export default Done;