'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Pagination from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'

type Data = {
  id: string
  ipAddress: string
  user: string
  userType: string
}

export default function MasterkeyHistory() {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<Data[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const router = useRouter()

  
  useEffect(() => {
    setLoading(true)
    const handler = setTimeout( async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/globalpass/getusagehistory?limit=10&page=${currentpage}`,{
          withCredentials:true
          })

          setList(response.data.data.usageHistory)
          setTotalpage(response.data.data.totalPages)
          setLoading(false)

        
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`)
              router.push('/')  
              }    
            } 
        }
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  },[currentpage])

  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }
  
  return (
    <div className=' w-full flex flex-col gap-6 bg-zinc-800 p-6 rounded-md'>
        <p className=' text-sm'>Master Key History</p>
        <Table className=''>
         {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
          {list.length === 0 && (
          <TableCaption className=' text-xs'>No data</TableCaption>
          )}
        <TableHeader className=' border-slate-700'>
            <TableRow>
            <TableHead className=' text-center'>Ip address</TableHead>
            <TableHead className=' text-center'>User</TableHead>
            <TableHead className=' text-center'>User type</TableHead>
          
            {/* <TableHead className=' text-center' >Date changed</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">{item.ipAddress}</TableCell>
              <TableCell className="font-medium text-center">{item.user}</TableCell>
              <TableCell className="font-medium text-center">{item.userType}</TableCell>
            </TableRow>
          ))}


            
        </TableBody>
        </Table>

        <div className=' w-full flex items-center justify-center'>
        {list.length !== 0 && (
        <div className=' mt-12'>
          <Pagination onPageChange={handlePageChange} total={totalpage} currentPage={currentpage}/>
        </div>
        )}
        </div>

       
    </div>
  )
}
