'use client'
import Card from '@/components/common/Card'
import axios, { AxiosError } from 'axios'
import { Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Wallets = {
  companycommission: number
  chronoprofit: number
payin: number
payoutcommission: number
payoutminer: number
registered: number
totalpayout: number
totalusercommission: number

}

export default function Cards() {
  const router = useRouter()
  const [wallets, setWallets] = useState<Wallets>() 
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getWallets = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/staffusers/getsadashboard`,{
        withCredentials:true
        })
        setWallets(response.data.data)
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


        <Card icon={<Wallet size={30} />} iconbg={'bg-yellow-500 '} title={'Payin'} amount={`${wallets?.payin.toLocaleString()}`} subtitle={'Use to purchase miner set up'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={'bg-yellow-500 '} title={'Total Payout'} amount={`${wallets?.totalpayout.toLocaleString()}`} subtitle={'The sum of commission wallet & miner wallet'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={'bg-yellow-500 '} title={'Chrono Package Total Payout'} amount={`${wallets?.payoutminer.toLocaleString()}`} subtitle={'Total income from chrono package'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={'bg-yellow-500 '} title={'Company Commission'} amount={`${wallets?.companycommission.toLocaleString()}`} subtitle={''} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={'bg-yellow-500 '} title={'Total User Commission'} amount={`${wallets?.totalusercommission.toLocaleString()}`} subtitle={'Total accumulated commission from direct refferal'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={'bg-yellow-500 '} title={'Unilevel Total Commission'} amount={`${wallets?.registered.toLocaleString()}`} subtitle={'Total accumulated commission from lvl 2 to lvl 10'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={'bg-yellow-500 '} title={'Total Payout Commission'} amount={`${wallets?.payoutcommission.toLocaleString()}`} subtitle={'Withdrawable value from direct referral & unilevel'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={'bg-yellow-500 '} title={'Chrono Package Profit'} amount={`${wallets?.chronoprofit.toLocaleString()}`} subtitle={'The sum of referral commission, unilevel & chrono package total earning'} text={''} loading={loading}/>

    </div>
  )
}
