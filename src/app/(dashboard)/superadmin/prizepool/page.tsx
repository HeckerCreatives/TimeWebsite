import React from 'react'
import Prizepool from './Prizepool'
import SuperAdminLayout from '@/components/layout/Superadminlayout'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" w-full h-full flex flex-col items-center p-8">
            <Prizepool/>
        </div>
    </SuperAdminLayout>
  )
}
