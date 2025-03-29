
import Card from '@/components/common/Card'
import axios, { AxiosError } from 'axios'
import { Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


type Wallets = {
    data : {
        "creditwallet": number
        "chronocoinwallet": number
        "commissionwallet": number
    }
    
}

type TotalEarnings = {
    data:{
        mining: number
        referral: number
        unilevel: number
    }

}

type Unclaimed = {
    data: {
        unclaimedearnings: number

    }
}

export default function Cards() {


    const [wallets, setWallets] = useState<Wallets>()
    const [earnings, setEarnings] = useState<TotalEarnings>()
    const [totalearnings, setTotalearnings] = useState(0)
    const [withdrawables, setWithdrawables] = useState(0)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [unclaimed, setUnclaimed] = useState(0)
    const unclaimedValue = unclaimed.toLocaleString()
  

  useEffect(() => {
    setLoading(true)
    const getRequestHistory = async () => {
      try {
        const wallet = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallets/userwallets`,{
        withCredentials: true
        })
      
        setWallets(wallet.data)
        setWithdrawables(wallet.data.data.commissionwallet + wallet.data.data.chronocoinwallet)
          setLoading(false)
      } catch (error) {
          setLoading(false)

          if (axios.isAxiosError(error)) {
           const axiosError = error as AxiosError<{ message: string, data: string }>;
             if (axiosError.response && axiosError.response.status === 401) {
               toast.error(`${axiosError.response.data.data}`)
               router.push('/')  
             }    
         } 
      }
      
     
    }
    getRequestHistory()
  },[])

  useEffect(() => {
    setLoading(true)

    const getRequestHistory = async () => {
     
      const earning = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallethistory/getwallettotalearnings`,{
        withCredentials: true
      })
     
      setEarnings(earning.data)
      setTotalearnings(earning.data.data.mining + earning.data.data.referral + earning.data.data.unilevel)
      setLoading(false)

    }
    getRequestHistory()
  },[])

  // useEffect(() => {
  //   setLoading(true)

  //   const getRequestHistory = async () => {
     
  //     const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getremainingunclaimedminer`,{
  //       withCredentials: true
  //     })

  //     setUnclaimed(response.data.data.unclaimed)
  
  //     setLoading(false)

  //   }
  //   getRequestHistory()
  // },[])



  return (
    <div className=' max-w-[1440px] h-auto w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]  gap-8 mt-6'>

        {/* <Card icon={<Wallet size={30} />} iconbg={' bg-orange-500'} title={'Top Up Balance'} amount={`${wallets?.data.creditwallet.toLocaleString()}`} subtitle={'Use to purchase miner set up'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-green-500'} title={'Total Withdrawables'} amount={`${withdrawables.toLocaleString()}`} subtitle={'The sum of commission wallet & miner wallet'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-red-500'} title={'Rig Miner Total Earning'} amount={`${earnings?.data.mining.toLocaleString()}`} subtitle={'Total income from miners'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-blue-500'} title={'Rig miner Wallet'} amount={`${wallets?.data.minecoinwallet.toLocaleString()}`} subtitle={'Unclaimed Miner Value'} text={`₱ ${unclaimed.toLocaleString()}`} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-pink-500'} title={'Referral Total Commission'} amount={`${earnings?.data.referral.toLocaleString()}`} subtitle={'Total accumulated commission from direct refferal'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-purple-500'} title={'Unilevel Total Commission'} amount={`${earnings?.data.unilevel.toLocaleString()}`} subtitle={'Total accumulated commission from lvl 2 to lvl 10'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-cyan-500'} title={'Comission Wallet'} amount={`${wallets?.data.commissionwallet.toLocaleString()}`} subtitle={'Withdrawable value from direct referral & unilevel'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-cyan-500'} title={'Total Earnings'} amount={`${totalearnings.toLocaleString()}`} subtitle={'The sum of referral commission, unilevel & rig miner total earning'} text={''} loading={loading}/> */}

        <Card icon={<Wallet size={30} className=' text-black'/>} iconbg={'bg-yellow-500'} title={'Credit Time Wallet'} amount={`${wallets?.data.creditwallet.toLocaleString()}`} subtitle={'Use to purchase chrono package'} text={''} loading={false}/>
        <Card icon={<Wallet size={30} className=' text-black'/>} iconbg={'bg-yellow-500'} title={'Total Redeemables'} amount={`${withdrawables.toLocaleString()}`} subtitle={'The sum of commission wallet & chrono package wallet'} text={''} loading={false}/>
        <Card icon={<Wallet size={30} className=' text-black'/>} iconbg={'bg-yellow-500'} title={'Chrono Package Total Earning'} amount={`${earnings?.data.mining.toLocaleString()}`} subtitle={'Total income from chrono package'} text={''} loading={false}/>
        <Card icon={<Wallet size={30} className=' text-black'/>} iconbg={'bg-yellow-500'} title={'Chrono Package Wallet'} amount={`${wallets?.data.chronocoinwallet.toLocaleString()}`} subtitle={'Unclaimed chrono package eranings'} text={''} loading={false}/>
        <Card icon={<Wallet size={30} className=' text-black'/>} iconbg={'bg-yellow-500'} title={'Referral Total Commission'} amount={`${earnings?.data.referral}`} subtitle={'Total accumulated commission from direct refferal'} text={''} loading={false}/>
        <Card icon={<Wallet size={30} className=' text-black'/>} iconbg={'bg-yellow-500'} title={'Unilevel Total Commission'} amount={`${earnings?.data.unilevel.toLocaleString()}`} subtitle={'Total accumulated commission from lvl 2 to lvl 10'} text={''} loading={false}/>
        <Card icon={<Wallet size={30} className=' text-black'/>} iconbg={'bg-yellow-500'} title={'Commission Wallet'} amount={`${wallets?.data.commissionwallet.toLocaleString()}`} subtitle={'Withdrawable value from direct referral & unilevel'} text={''} loading={false}/>
        <Card icon={<Wallet size={30} className=' text-black'/>} iconbg={'bg-yellow-500'} title={'Total Revenue'} amount={`${totalearnings.toLocaleString()}`} subtitle={'The sum of referral commission, unilevel & rig miner total earning'} text={''} loading={false}/>
    </div>
  )
}
