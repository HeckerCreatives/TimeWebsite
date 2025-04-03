'use client'
import React, { useEffect, useState } from 'react'
import { Slider } from "@/components/ui/slider"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Spinner from './Spinner'
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
import { handleApiError } from '@/lib/errorHandler'



type Props = {
    name: string
    percentage: string
    duration: string
    min: number
    max: number
    img: string
    size: string
    b1t1: string
    type: string
    canbuy: boolean
    isunlock: boolean
}

export default function Productcard( prop: Props) {
    const [slider, setSlider] = useState(0)
    const [val, setVal] = useState([prop.min]);
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [dialog, setDialog] = useState(false)
    const [isOpen, setIsopen] = useState('')
    const [skip, setSkip] = useState(false)
    const [canBuy, setCanBuy] = useState(prop.canbuy)
    const [unlock, setUnlock] = useState(prop.isunlock)


    const buyChrono = async () => {
        setDialog(false)
        setLoading(true)
        router.push('?state=true')
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/inventory/buychrono`,{
                type: prop.type, // quick_miner, switf_lane, rapid_lane
                pricechrono: val[0],
                skip: skip
            },{
                withCredentials: true,
                headers:{
                    'Content-Type':'Application/json'
                }
            })

            const response = await toast.promise(request, {
                loading: `Purchasing ${prop.name}...`,
                success: `You succesfully purchased ${prop.name}`,
                error: `Error while purchasing ${prop.name}`,
            });
            if(response.data.message === 'success'){
                // setLoading(false)
                // router.push('?state=false')
                window.location.reload()
            }

        } catch (error) {
            setLoading(false)
           handleApiError(error)
            
        }
    }

    useEffect(() => {

        const getState = async () => {
         const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/maintenance/geteventmaintenance?type=b1t1`,{
             withCredentials: true
         })
 
         setIsopen(response.data.data.value)
        }
        getState()
     },[])

      
     const getState = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/chrono/getUserChrono?type=${prop.type}`,{
            withCredentials: true
        })
        setSkip(response.data.data)
    }



  return (

    <div className=' w-full flex items-end justify-end h-auto mt-10'>
        <div className=' relative w-full flex flex-col bg-zinc-800 rounded-sm h-auto lg:min-h-[550px]'>
            <div className=' relative w-full grid grid-cols-1 lg:grid-cols-2 h-full lg:min-h-[550px] gap-4'>
                <div className=' w-full h-[200px] lg:h-full relative flex items-center justify-center overflow-hidden'
                 style={{ backgroundImage: `url('/Side Background.png')` }}
                >
                    <img src={`${prop.img}`} alt="" width={prop.size} className=' object-cover absolute top-0 lg:top-auto' loading='lazy' />

                </div>

                <div className=' w-full flex flex-col gap-1 p-4'>

                    <div className=" w-full flex items-center justify-center">
                        <img src="/GTIME-LOGO.png" alt="logo" loading="lazy" width={60} height={60} className=" w-[70px] "/>
                        <img src="/game-time-png-words.png" alt="logo" loading="lazy" width={80} height={80} className=" w-[150px] " />
                    </div>

                    <div className=' flex flex-col gap-2 mt-8'>
                        <p className=' text-lg font-semibold text-white'>{prop.name}</p>
                        <p className=' text-xs text-yellow-500'>{prop.percentage}% Profit</p>
                        <p className=' text-xs text-yellow-500'>{prop.duration} days duration</p>
                    </div>

                    <div className=' w-full flex flex-col gap-2 mt-8'>
                        <p className=' text-sm text-yellow-500'>Price</p>
                        <Slider onValueChange={(i) => setVal(i)} value={val} defaultValue={val} min={prop.min} max={prop.max} step={1} />
                        <label htmlFor="" className=' text-xs text-zinc-400 mt-4'>Or input amount here</label>
                        <Input
                        type="text"
                        min={prop.min}
                        max={prop.max}
                        value={val[0].toLocaleString()} 
                        onChange={(e) => {
                            let inputValue = e.target.value.replace(/,/g, ""); // Remove commas
                            let numValue = Number(inputValue);
                           
                            // Ensure valid number and limit within min-max range
                            
                            if (!isNaN(numValue)) {
                            if (numValue > prop.max) {
                                numValue = prop.max;
                            }
                            setVal([numValue]);
                            }
                        }}
                        placeholder="Input amount here"
                        className="text-sm p-2 rounded-md text-black"
                        />

                        <div className=' w-full flex items-center justify-between text-xs mt-2'>
                            <p className=' text-xs text-zinc-400'>min:₱ {(prop.min).toLocaleString()}</p>
                            <p className=' text-xs text-zinc-400'>max:₱ {(prop.max).toLocaleString()}</p>

                        </div>

                        <div className=' h-auto flex flex-col mt-6 gap-2'>
                        {prop.b1t1 === '1'? (
                        <p className=' text-[.8rem]  w-fit rounded-full'>Promo: <span className=' text-yellow-500'>Double Time</span></p>
                        ) : (
                        <p className=' text-[.8rem] w-fit rounded-full'>Promo: <span className=' text-yellow-500'>Regular</span></p>

                        )}

                      
                        </div>

                        <div className=' w-full flex md:flex-row flex-col gap-6 md:items-center justify-between mt-8'>
                            <p className=' text-xs font-semibold'>Selected price : <span className=' text-orange-300'>P{val.toLocaleString()}</span></p>
                            <Dialog open={dialog} onOpenChange={setDialog}>
                            <DialogTrigger>
                            {canBuy && unlock ? (
                                <button onClick={getState} disabled={loading} className='bg-yellow-500 py-1 clip-btn flex items-center gap-2 px-6 text-xs font-semibold text-black'>
                                    {loading && <Spinner />}
                                    Purchase
                                </button>
                            ) : unlock ? (
                                <button disabled className='bg-yellow-500 py-1 clip-btn flex items-center gap-2 px-6 text-xs font-semibold text-black'>
                                    You still have an active Chrono package
                                </button>
                            ) : (
                                <button disabled className='bg-yellow-500 py-1 clip-btn flex items-center gap-2 px-6 text-xs font-semibold text-black'>
                                    Please buy the lower tier before unlocking this
                                </button>
                            )}
                                
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Are you sure you’d like to proceed with ordering <span className=' text-yellow-500'>{prop.name}</span> ?</DialogTitle>
                                <DialogDescription>
                                    
                                </DialogDescription>
                                </DialogHeader>
                                {skip ?  (
                                    <>
                                    <p className=' text-xs text-red-500'>Note: Just a friendly reminder bypassing the previous chrono package could lead to a 50% reduction in your potential profit.</p>

                                    <div className=' w-full flex flex-col'>
                                        <p className=' text-sm text-yellow-500  '><span className=' line-through'>{prop.percentage}% Profit</span>  {(prop.percentage as any) / 2}% Profit</p>
                                        <p className=' text-sm text-yellow-500'>{prop.duration} days duration</p>
                                        <p className=' text-sm text-white'>Selected Price: <span className=' text-yellow-500'>P {val[0].toLocaleString()}</span></p>

                                        <div className=' w-full flex items-end justify-end gap-4'>
                                            <Button onClick={buyChrono} className=' text-black rounded-md'>Continue</Button>

                                        </div>
                                    </div>
                                    
                                    </>
                                ) : (
                                    <div className=' w-full flex flex-col'>
                                        <p className=' text-sm text-yellow-500'>{prop.percentage}% Profit</p>
                                        <p className=' text-sm text-yellow-500'>{prop.duration} days duration</p>
                                        <p className=' text-sm text-white'>Selected Price: <span className=' text-yellow-500'>P {val[0].toLocaleString()}</span></p>

                                        <div className=' w-full flex items-end justify-end gap-4'>
                                            <Button onClick={buyChrono} className=' text-black rounded-md'>Continue</Button>

                                        </div>
                                    </div>
                                )}
                            </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}
