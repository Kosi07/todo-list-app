'use client';

import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";

const CreateNewTask = ({ fetchTasks }:{ fetchTasks: () => Promise<void> }) => {
    
    const [inputValue, setInputValue] = useState('');

    const router = useRouter();

    const [showDropDown, setShowDropDown] = useState(false);

    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

    const allSuggestions = [
        "Buy groceries for the week",
        "Book dentist appointment",
        "Plan weekend trip to the beach",
        "Call mom about birthday plans",
        "Finish project report by Friday",
        "Research new laptop options",
        "Organize my desk",
        "Learn JS basics"
    ];

    useEffect(()=>{
        if(inputValue.trim()===''){
          setShowDropDown(false)
          return
        }

        setFilteredSuggestions(allSuggestions.filter( suggestion => suggestion.toLowerCase().includes(inputValue.toLowerCase()) ))
        setShowDropDown(true)
    }, [inputValue])

    function handleSelectDropDown(filteredSuggestion: string){
      setInputValue(filteredSuggestion);
      console.log(filteredSuggestion);
      setShowDropDown(false);
    }

    function addNewTask(){
        let taskStatus = 'in-progress'
        if (inputValue.trim()!==''){

            saveToMongoDb(inputValue, taskStatus)
              .then(result=>{
                if(result===true){
                  fetchTasks()
                  setInputValue('')
                }
                else{
                  alert('Failed to add task')
                }
              })

        }
        else if (inputValue.trim()===''){
          setInputValue(displayedText.trim().replace('|', ''))
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
        'Seize the day!',
        'Add a new task...',
        'Buy groceries',
        'Do laundry',
        'Clean my room 🧹',
        'Respond to emails',
        'Work out 💪',
        'Meal prep',
        'Call Mom & Dad ❤️',
        'Plan the week 🗓️',
        'Save the world, duh!',
        '',
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
      } 
      else {
        // Deleting backward
        if (currentIndex > 0) {
          setDisplayedText(currentText.substring(0, currentIndex - 1));
          setCurrentIndex(prev => prev - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setTextArrayIndex((prev) => (prev + 1) % texts.length); //For an infinite loop
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, textArrayIndex, isActive]);

  const saveToMongoDb = async(taskText:string,taskStatus:string) => {
    try{
      const response = await fetch('/api/tasks', {
         method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  taskText,
                  taskStatus,
                })
      })

      const data = await response.json()

      if(response.ok){
        alert('Success! Task added!') //Toast notification should be here
      }
      else{
        alert(`Failed to save.\n${data.error}`);
        if(response.status===401){
          router.push('/sign-in')
        }
      }

      return response.ok
    }
    catch(err){
      return ('Error saving to MongoDB '+err)
    }
  }


  return (
        <div className='h-20 w-2/3 min-w-85 max-w-250 rounded-2xl bg-linear-to-r from-orange-500 via-orange-300 to-orange-400 flex flex-col items-center mb-8 sticky top-3
                    shadow-lg sm:text-2xl md:text-3xl lg:text-4xl'>
            <div 
                className='flex justify-between items-center p-4 w-full'>
                <input 
                    id='taskInputValue'
                    autoComplete='on'
                    className='w-18/20 p-1 pl-1 rounded-xl font-bold focus:outline-none text-white
                            hover:cursor-text duration-300 ease-in-out'
                    type='text'
                    value={inputValue}
                    onFocus={()=>setIsActive(false)}
                    onBlur={()=>{
                                    setIsActive(true)
                                    
                                    setTimeout(() => setShowDropDown(false), 100) // Delay to allow click event on dropdown items to register
                                }
                            }
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    placeholder={displayedText + (isActive? '|' : '')}
                />

                <button
                    className='text-2xl border border-double rounded-xl p-1 shadow-lg
                            hover:text-white hover:cursor-pointer hover:bg-orange-200 hover:border-4 hover:rounded-xl duration-200'
                    onClick={addNewTask}
                >
                    +
                </button> 
            </div>

            {showDropDown && 
                filteredSuggestions
                    .slice(0, 4) // Limit to top 4 suggestions
                    .map(filteredSuggestion => 
                        <div 
                          key={filteredSuggestion} 
                          className='bg-gray-300/60 rounded-lg w-full p-2 backdrop-blur-lg hover:text-white hover:bg-gray-700 hover:cursor-pointer' 
                          onClick={()=>{console.log('onclick');handleSelectDropDown(filteredSuggestion)}}
                        >
                          {filteredSuggestion}
                        </div>)
            }
        </div>
  )
}

export default CreateNewTask; 