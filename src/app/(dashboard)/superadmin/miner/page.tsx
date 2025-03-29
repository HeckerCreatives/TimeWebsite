'use client'
import React, { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import axios, { AxiosError } from 'axios'
import { Turtle } from 'lucide-react'
import { Value } from '@radix-ui/react-select'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import SuperAdminLayout from '@/components/layout/Superadminlayout'
import MinerCard from '@/components/common/Minercard'

type Chrono = {
    duration: number
  id: string
  isBuyonetakeone: string
  max: number
  min: number
  name: string
  profit: number
  }


export default function page() {
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const params = useSearchParams()
    const refresh = params.get('state')

    const handleSwitchChange: React.Dispatch<React.SetStateAction<boolean>> = (event) => {
        setIsChecked(event);
        onOff(event)
      };

    useEffect(() => {

       const getState = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/maintenance/geteventmaintenance?type=b1t1`,{
            withCredentials: true
        })

        setIsChecked(response.data.data.value === "0" ? false : true)

       }
       getState()
    },[refresh])

  
    const onOff = async (newState: any) => {
            setLoading(true)
            router.push('?state=true')
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/maintenance/changemaintenance`,{
                    type: 'b1t1',
                    value: newState === true ? '1' : '0'
                },{
                    withCredentials:true,
                    headers:{
                    'Content-Type': 'application/json',
                    }
                })
    
                if( response.data.message === 'success'){
                    toast.success(`Buy one take one is now ${isChecked === true ? 'off' : 'on'}`) 
                    setLoading(false)
                    router.push('?state=false')

                }
    
    
    
            } catch (error) {
            setLoading(false)
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string, data: string }>;
                if (axiosError.response && axiosError.response.status === 401) {
                    toast.error(`${axiosError.response.data.data}`) 
                    router.push('/')    
                }
    
                if (axiosError.response && axiosError.response.status === 400) {
                    toast.error(`${axiosError.response.data.data}`)     
                        
                }
    
                if (axiosError.response && axiosError.response.status === 402) {
                    toast.error(`${axiosError.response.data.data}`)          
                            
                }
    
                if (axiosError.response && axiosError.response.status === 403) {
                    toast.error(`${axiosError.response.data.data}`)              
                    
                }
    
                if (axiosError.response && axiosError.response.status === 404) {
                    toast.error(`${axiosError.response.data.data}`)             
                }
        } 
    
                
            }
    }

    const [list, setList] = useState<Chrono[]>([])

    useEffect(() => {

        const getState = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/chrono/getchrono`,{
            withCredentials: true
        })
        setList(response.data.data)
        }
        getState()
    },[])

    const quick = list.find((item) => item.name === 'Quick Miner')
    const swift = list.find((item) => item.name === 'Switf Lane')
    const rapid = list.find((item) => item.name === 'Rapid Lane')
    const flash = list.find((item) => item.name === 'Flash Miner')

   

    
    
  return (
    <SuperAdminLayout>
        <div className=" w-full h-full flex flex-col gap-12 p-8">

        <div className=' w-full flex items-center flex-wrap gap-4'>
            {list.map((item, index) => (
            <MinerCard key={index} id={item.id} name={item.name} profit={(item.profit) * 100} duration={item.duration} img={''} size={'140'} max={item.max} min={item.min} isBuyonetakeone={item.isBuyonetakeone}/>

            ))}
            
           </div>
           

           {/* <div className=' w-full flex items-center flex-wrap gap-4'>
            <MinerCard id={quick?.id || ''} name={'Quick Miner'} profit={(quick?.profit || 0) * 100} duration={quick?.duration || 0} img={'/assets/quick-miner.png'} size={'140'} max={quick?.max || 0} min={quick?.min || 0} isBuyonetakeone={quick?.isBuyonetakeone || ''}/>
            <MinerCard id={swift?.id || ''} name={'Swift Miner'} profit={(swift?.profit || 0) * 100} duration={swift?.duration || 0} img={'/assets/Swift-miner.png'} size={'120'} max={swift?.max || 0} min={swift?.min || 0} isBuyonetakeone={swift?.isBuyonetakeone || ''}/>
            <MinerCard id={rapid?.id || ''} name={'Rapid Miner'} profit={(rapid?.profit || 0) * 100} duration={rapid?.duration || 0} img={'/assets/Rapid-miner.png'} size={'110'} max={rapid?.max || 0} min={rapid?.min || 0} isBuyonetakeone={rapid?.isBuyonetakeone || ''}/>
            <MinerCard id={flash?.id || ''} name={'Flash Miner'} profit={(flash?.profit || 0) * 100} duration={flash?.duration || 0} img={'/assets/flash-miner.png'} size={'140'} max={flash?.max || 0} min={flash?.min || 0} isBuyonetakeone={flash?.isBuyonetakeone || ''}/>
           </div> */}
        </div>
    </SuperAdminLayout>
  )
}
