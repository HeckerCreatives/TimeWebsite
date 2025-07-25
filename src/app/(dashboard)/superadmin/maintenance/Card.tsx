'use client'
import Maintenancecard from '@/components/common/Maintenancecard'
import { handleApiError } from '@/lib/errorHandler'
import axios from 'axios'
import { HandCoins, MonitorCog, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface List {
  type: string
  value: string
}

export default function Card() {
  const [value, setValue] = useState('')
  const [list, setList] = useState<List[]>([])

  const filter = list.filter((item) => item.type !== 'b1t1')

  useEffect(() => {
    const getWallets = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/maintenance/getmaintenance`,{
        withCredentials:true
        })

        setList(response.data.data.maintenancelist)

      
      } catch (error) {
        handleApiError(error)
      }
    }
    getWallets()
  },[])
  return (
    <div className=' max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
      {filter.map((item, index) => (
        <Maintenancecard icon={<HandCoins size={40}/>} name={``} value={item.value} type={item.type}/>
      ))}
        {/* <Maintenancecard icon={<HandCoins size={40}/>} name={'Maintenance Payout'} value={value} type='payout'/> */}
        {/* <Maintenancecard icon={<Wallet size={40}/>} name={'Maintenance Deposit'} value={0}/>
        <Maintenancecard icon={<MonitorCog size={40}/>} name={'Full Maintenance'} value={0}/> */}
    </div>
  )
}
