import React from 'react'
import { Undo2 } from 'lucide-react'

export default function Notfound() {
  return (
    <div className=' flex flex-col items-center justify-center gap-4 w-full h-screen bg-zinc-950'>
        <h2 className=' text-5xl font-bold text-yellow-600'>404</h2>
        <p className=' text-sm text-zinc-300'>Page not found!</p>
        <a href="/">
            <button className=' px-6 py-2 bg-zinc-800 text-zinc-100 mt-6 flex items-center text-xs rounded-full gap-2'>Main Page <Undo2 size={20}/></button>
        </a>
        
    </div>
  )
}
