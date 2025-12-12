'use client';

import { KeyboardEvent, useEffect, useState } from "react";

const CreateNewTask = ({ undoneTasks, setUndoneTasks }:{undoneTasks: Array<string>, setUndoneTasks: React.Dispatch<React.SetStateAction<string[]>>}) => {
    
    const [inputValue, setInputValue] = useState('');

    function addNewTask(){
        if (inputValue.trim().length>0){
            setUndoneTasks([...undoneTasks, inputValue]);

            setInputValue(''); 
        }
    };

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>){
        if (e.key==='Enter'){
            addNewTask();
        }
    };

  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textArrayIndex, setTextArrayIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const texts = [ 
        'Create a new task...',
        'Buy groceries',
        'Do laundry',
        'Clean my room 🧹',
        'Call Diddy ❤️',
        'Respond to emails',
        'Schedule appointments',
        'Work out 💪',
        'Meal prep',
        'Call Mom & Dad ❤️',
        'Plan the week 🗓️',
        'Save the world, duh!',
    ]

    const currentText = texts[textArrayIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting backward
        if (currentIndex > 0) {
          setDisplayedText(currentText.substring(0, currentIndex - 1));
          setCurrentIndex(prev => prev - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setTextArrayIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, textArrayIndex, isActive]);


  return (
        <div className='h-20 w-2/3 min-w-[340px] max-w-[1000px] rounded-2xl bg-linear-to-r from-orange-500 via-orange-300 to-orange-400 flex items-center mb-13 sticky top-3
                    shadow-lg sm:text-2xl md:text-3xl lg:text-4xl'>
            <div 
                className='flex justify-between items-center p-4 w-full'>
                <input 
                    id='taskInputValue'
                    autoComplete='on'
                    className='w-8/10 p-1 pl-1 rounded-xl font-bold focus:outline-none text-white
                            hover:bg-orange-200 hover:p-2 duration-300 ease-in-out'
                    type='text'
                    value={inputValue}
                    onFocus={()=>setIsActive(false)}
                    onBlur={()=>setIsActive(true)}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    placeholder={displayedText + (isActive? '|' : '')}
                />

                <button
                    className='text-2xl border-1 rounded-xl p-1
                            hover:text-white hover:cursor-pointer hover:bg-orange-200 hover:text-3xl hover:p-3 hover:border-4 hover:rounded-xl duration-400'
                    onClick={addNewTask}
                >
                    +
                </button> 
            </div>
        </div>
  )
}

export default CreateNewTask;