'use client'
import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { handleApiError } from '@/lib/errorHandler'
import toast from 'react-hot-toast'
import axios from 'axios'
import { boolean } from 'zod'


type Props = {
    icon: React.ReactElement
    name: string
    type: string
    value: string

}

export default function Maintenancecard( prop: Props) {
  const [state, setState] = useState(false)

  const updateMaintenance = async (newState: boolean) => {
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/maintenance/changemaintenance`, {
        type: prop.type, 
        value: newState ? '1' : '0'
      }, {
        withCredentials: true
      });

      const response = await toast.promise(request, {
        loading: 'Updating....',
        success: `Successfully updated`,
        error: 'Error while updating maintenance',
      });

      if (response.data.message === 'success') {
         window.location.reload();

      }
    } catch (error) {
     handleApiError(error)
    }
  }

  useEffect(() => {
    setState(prop.value === '0' ? false : true)
  },[prop])


  return (
    <div className=' w-full h-auto p-4 flex items-center gap-4 bg-zinc-800 rounded-sm'>
        
        <div className='flex items-center justify-center bg-zinc-900 p-4 rounded-sm text-yellow-500'>
            {prop.icon}
        </div>
      

        <div className=' flex flex-col gap-3'>
            <p className=' text-sm font-semibold'>{prop.name}</p>
            <Switch checked={state} onCheckedChange={(checked) => updateMaintenance(checked)} />
        </div>

    </div>
  )
}
