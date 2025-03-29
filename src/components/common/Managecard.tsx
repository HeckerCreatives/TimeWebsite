import { Wallet } from 'lucide-react'
import React from 'react'

type Props ={
    icon: React.ReactElement
    iconbg: string
    title: string
    amount: string
    subtitle: string
    text: string
}

export default function ManageCard( prop: Props) {
  return (
    <div className=' w-full flex-grow-1 h-[120px] bg-zinc-900 p-3'>
            <div className=' w-full grid grid-cols-2 border-b-[1px] border-slate-700 rounded-sm'>
                <div className={`p-2 w-fit h-fit ${prop.iconbg} text-black rounded-sm -translate-y-8`}>
                    {prop.icon}

                </div>
                <div className=' w-full flex flex-col gap-2 items-end text-zinc-100 py-2'>
                    <p className=' text-xs'>{prop.title}</p>
                    <p className=' text-lg text-yellow-200'>{prop.amount}</p>
                </div>
            </div>

            <div className=' w-full flex items-center justify-between text-[.6rem]'>
            <p className=' mt-2 text-orange-300'>{prop.subtitle}</p>
            <p className=' mt-2 text-orange-300'>{prop.text}</p>

            </div>
        </div>
  )
}
