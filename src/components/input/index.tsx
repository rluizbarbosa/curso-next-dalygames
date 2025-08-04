"use client"

import { FormEvent, useState } from "react"
import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function Input() {
    const [input, setInput] = useState("")
    const router = useRouter()
    
    function handleSearch (event: FormEvent){
        event.preventDefault()
        if(input === "") return
        const encodeTitle = encodeURI(input)
        router.push(`/game/search/${encodeTitle}`)
    }


    return (
        <form 
            onSubmit={handleSearch} 
            className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-3">
            <input 
                type="text" 
                placeholder="Procurando algum jogo?..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-slate-200 outline-none w-11/12"
            />
            <button
                type="submit"
            >

            <FiSearch 
                size={24}
                color="#ea580c"
            ></FiSearch>
            </button>
        </form>
    )
}