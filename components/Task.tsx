import Image from 'next/image';
import uncheckedImg from '@/public/unchecked.svg';
import checkedImg from '@/public/checked2.svg';
import trashIcon from '@/public/delete.svg';


const Task = ({ _id, taskText, taskStatus, fetchTasks } : { _id:string, taskText: string, taskStatus: string, fetchTasks: () => Promise<void>}) => {

  let isDone

  if(taskStatus==='done'){
    isDone = true
  }
  else if(taskStatus==='in-progress'){
    isDone = false
  }

  const changeTaskStatus = async(_id:string, taskStatus:string) => {
    const response = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id,
          taskStatus,
        }),
      })

    if(response.ok){
      fetchTasks()
    }
    else{
      alert('!Error changing task status.')
      console.error('Error changing task status', response)
    }

  }

  const deleteTask = async(_id:string) => {
    const response = await fetch('/api/tasks', {
                                  method: 'DELETE',
                                          headers: { 'Content-Type': 'application/json' },
                                          body: JSON.stringify({
                                            _id,
                                          })
                                }
    )

    if(response.ok){
      fetchTasks()
    }
    else{
      console.error('Error deleting task', response)
    }
  };

  const editTask = () => {
    console.log()
  };

  return (
    <div 
      className={`h-20 sm:h-30 w-2/3 min-w-85 max-w-300 font-[415] rounded-2xl bg-white border border-gray-200  
                  flex items-center flex-row gap-3 p-2
                  shadow-lg shadow-orange-200/50
                  hover:bg-gray-100 duration-400 ease-in`}
      >
        <Image 
            id='checkbox-icon'
            className='w-1/4 h-2/3
                        hover:cursor-pointer hover:scale-110 duration-300 ease-in-out'
            src={isDone?checkedImg:uncheckedImg}
            alt='checkbox-icon'
            title={isDone? 'Mark as not done?' : 'Mark as done?'}
            onClick={ ()=>{
                            changeTaskStatus(_id, taskStatus);
                          }
                     }
        />

        <div 
            className={`overflow-auto wrap-break-word max-h-4/5 w-3/4 max-w-3/4 text-xl sm:text-2xl ${isDone? 'text-gray-400' : ''} ${isDone? 'line-through' : ''} decoration-2 decoration-black`}
            onClick={editTask}
        >
            {taskText}
        </div>

        <Image 
            className='w-1/5 h-9/20 bg-red-500 rounded-xl
                        hover:cursor-pointer hover:bg-red-400 active:scale-110 hover:shadow-lg hover:scale-110 duration-300 ease-in-out'
            onClick={()=>deleteTask(_id)}
            src={trashIcon}
            alt='delete icon'
            title='Delete task'
        />
    </div>
  )
}

export default Task;