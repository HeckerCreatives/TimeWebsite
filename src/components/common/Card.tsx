import { Wallet } from 'lucide-react'
import React from 'react'

type Props ={
    icon: React.ReactElement
    iconbg: string
    title: string
    amount: string
    subtitle: string
    text: string
    loading: boolean
}

export default function Card( prop: Props) {
  return (
    <div className=' flex flex-col justify-between flex-grow-1 h-[150px] bg-zinc-800 p-3'>
            <div className=' w-full grid grid-cols-[100px_1fr]  rounded-sm'>
                <div className={`p-2 w-fit h-fit ${prop.iconbg} text-black rounded-sm -translate-y-8`}>
                    {prop.icon}

                </div>
                <div className=' w-full flex flex-col gap-2 items-end text-zinc-100 py-2'>
                    <p className=' text-xs'>{prop.title}</p>
                    {prop.loading === true ? (
                        <p className=' w-[80px] h-[25px] rounded-sm bg-slate-600 animate-pulse'></p>
                    ): (
                        <>
                        <p className=' text-lg text-yellow-200'>₱ {prop.amount.slice(0,15)}</p>
                        <p className=' text-lg text-yellow-200'>{prop.amount.slice(15,30)}</p>
                            
                        </>

                    )}
                </div>
            </div>

            <div className=' w-full flex items-center justify-between text-[.6rem] border-t-[1px] border-slate-700'>
            <p className=' mt-2 text-orange-300'>{prop.subtitle}</p>
            <p className=' mt-2 text-orange-300'>{prop.text}</p>

            </div>
        </div>
  )
}
