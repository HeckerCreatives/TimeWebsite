import React from 'react'
import Card from './Card'
import SuperAdminLayout from '@/components/layout/Superadminlayout'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className="  w-full h-full flex flex-col items-center p-8">
            <Card/>
        </div>
    </SuperAdminLayout>
  )
}
