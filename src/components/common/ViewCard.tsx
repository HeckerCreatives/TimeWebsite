import { Pen, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { handleApiError } from '@/lib/errorHandler'
import { useSearchParams } from 'next/navigation'
  

type Props ={
    icon: React.ReactElement
    iconbg: string
    title: string
    amount: number
    subtitle: string
    text: string
    loading: boolean
    editable: boolean
    type: string
}

export default function ViewCard( prop: Props) {
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)
     const params = useSearchParams()
        const id = params.get('uid')

    useEffect(() => {
        setAmount(prop.amount)
    },[prop])

    const editWallet = async () => {
        setLoading(true)
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/wallets/editplayerwalletforadmin`,{
                playerid: id,
              type: prop.type,
              amount: amount
            },
                {
                    withCredentials: true
                }
            )
    
            if(response.data.message === 'success'){
              toast.success('Success')
              setLoading(false)
              window.location.reload()
           
    
            } 
    
            
            
        } catch (error) {
          setLoading(false)
    
            handleApiError(error)
            
        }
    
    }
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
                        <div className=' flex items-center gap-4'>
                            {prop.editable && (
                            <Dialog>
                            <DialogTrigger>
                            <button className=' bg-yellow-500 p-1 text-black rounded-sm cursor-pointer'><Pen size={ 12}/></button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure to edit <span className=' text-yellow-500'>{prop.title}</span>?</DialogTitle>
                                <DialogDescription>
                                   
                                </DialogDescription>
                                </DialogHeader>

                                <div className=' w-full'>
                                    <label htmlFor="">Amount</label>
                                    <Input type='text' className=' text-black mt-1' value={amount.toLocaleString()}
                                      onChange={(e) => {
                                        const rawValue = e.target.value.replace(/,/g, '');
                                        const numValue = Number(rawValue);
                  
                                        if (!isNaN(numValue)) {
                                          setAmount(numValue);
                                        } else if (rawValue === '') {
                                          setAmount(0);
                                        }
                                      }}
                                    />

                                    <Button disabled={loading} onClick={editWallet} className='clip-btn px-12 w-fit mt-4'>
                                    {loading === true && ( <div className='spinner'></div>)}
                                        Save</Button>

                                </div>
                            </DialogContent>
                            </Dialog>


                            )}
                            <p className=' text-lg text-yellow-200'>₱ {amount.toLocaleString()}</p>

                        </div>
                        {/* <p className=' text-lg text-yellow-200'>{prop.amount.slice(15,30)}</p> */}
                            
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
