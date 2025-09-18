'use client';

import Task from './Task';
import { cookie } from '@/hooks/useSpecialFonts';


const NotDone = ({ undoneTasks, doneTasks, setDoneTasks, setUndoneTasks }) => {
  return (
     <div className='my-8 w-full flex flex-col items-center gap-3'>
        <span className='text-start w-7/10 text-2xl lg:text-3xl text-gray-500'>Not Done ❌</span>

        <div className='tasks flex flex-col items-center gap-4 w-6/10 min-w-[340px]'>
            {
              undoneTasks!=null && undoneTasks.length>0?
                undoneTasks.map((text, index) => <Task key={`undoneTask${index+1}`} index={index} taskText={text} doneTasks={doneTasks} setDoneTasks={setDoneTasks} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks}/>)
              : 
                <div className='text-start w-full text-xl md:text-[22px] text-gray-500 
                                bg-gray-200 p-8 rounded-xl'><span className={`text-orange-500 text-3xl md:text-4xl p-2 ${cookie.className}`}>Create</span>tasks and they'll appear here...</div>
            }
        </div>
    </div>
  )
}

export default NotDone