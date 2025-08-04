"use client"
import { useState } from 'react'
import { FiEdit, FiX } from 'react-icons/fi'
export default function FavoriteCard(){

    const [input, setInput] = useState("")
    const [gameName, setGameName] = useState("")
    const [showInput, setShowinput] = useState(false)

    function handleButton(){
        setShowinput(!showInput)
        setGameName(input)
        setInput("")
    }
    


    return (
        <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
            
            {showInput ? (
                <div className="flex items-center justify-center gap-3">
                    <input 
                        className="bg-white w-full rounded-md h-8 text-black px-2 outline-none"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button 
                        className="flex items-center justify-center h-8 self-start hover:scale-110 duration-200 transition-all"
                        onClick={handleButton}    
                    >
                        <FiX size={24} color='#fff'></FiX>
                    </button>
                </div>
            ) : (
                <button 
                    className="self-start hover:scale-110 duration-200 transition-all"
                    onClick={handleButton}    
                >
                    <FiEdit size={24} color='#fff'></FiEdit>
                </button>
            )}
            
            <div>
                {gameName &&  (
                    <div>
                        <span className='text-white'>Jogo favorito:</span>
                        <p className='text-white font-bold'>{gameName}</p>
                    </div>
                ) }
                {!gameName &&  (
                    <div>
                        <span>
                            Adicionar Jogo
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}