'use client'
import Card from '@/components/common/Card'
import axios, { AxiosError } from 'axios'
import { Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Total = {
    totalrequestcommission: number,
    totalrequestminecoin: number
}
export default function Cards() {
    const router = useRouter()
  const [total, setTotal] = useState<Total>() 
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getWallets = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/payout/gettotalrequest`,{
        withCredentials:true
        })
        setTotal(response.data.data)
        setLoading(false)

      
      } catch (error) {
        if (axios.isAxiosError(error)) {
        setLoading(false)
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
            toast.error(`${axiosError.response.data.data}`)
            router.push('/')  
            }    
          } 
      }
    }
    getWallets()
  },[])
  return (
    <div className=' max-w-[1440px] h-auto w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-6'>


    <Card icon={<Wallet size={30} />} iconbg={' bg-yellow-500'} title={'Total Request Commission'} amount={`${total?.totalrequestcommission.toLocaleString()}`} subtitle={'User Total Request Commission'} text={''} loading={loading}/>
    <Card icon={<Wallet size={30} />} iconbg={' bg-yellow-500'} title={'Total Miner Request'} amount={`${total?.totalrequestminecoin.toLocaleString()}`} subtitle={'User Total Miner Request'} text={''} loading={loading}/>
   

</div>
  )
}
