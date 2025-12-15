'use client';

import Task from './Task';
import { cookie } from '@/fonts';


const NotDone = ({ undoneTasks } : {undoneTasks: string[]}) => {
  return (
     <div className='my-4 w-full flex flex-col items-center gap-3'>
        <div className='undone-tasks flex flex-col items-center gap-4 w-7/10 min-w-85'>
            {
              undoneTasks.length>0?
                undoneTasks.map(text => <Task key={`undoneTask ${text}`} taskText={text} />)
              : 
                
            }
        </div>
    </div>
  )
}

export default NotDone