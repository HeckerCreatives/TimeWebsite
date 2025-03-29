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
import Spinner from '@/components/common/Spinner'

type Sales = {
  _id: string
  totalValue: number
}


export default function SalesTable() {
  const router = useRouter()
  const [sales, setSales] = useState<Sales[]>([])
  const [loading, setLoading] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  useEffect( () => {
    setLoading(true)
    const getSales = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/analytics/getsales?startDate=${start}&endDate=${end}`,{
        withCredentials:true
        })
        setSales(response.data.data.analytics)
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
    getSales()
  },[start, end])


  

  const reset = () => {
    setStart('')
    setEnd('')
  }


  return (
    <div className=' relative w-full max-w-[1440px] flex flex-col items-center gap-8 mt-4 bg-zinc-800 p-6'>
        <div className=' flex md:flex-row flex-col gap-4 items-center justify-between absolute z-20 top-0 w-[98%] h-auto bg-yellow-500 p-2 rounded-sm -translate-y-4'>
            <p className=' text-sm font-semibold text-black'>Sales</p>

            <div className=' flex flex-wrap md:items-end items-center justify-center gap-2'>
              <div className=' flex flex-col text-xs'>
                <label htmlFor="">Start Date</label>
                <input value={start} onChange={(e) => setStart(e.target.value)} type="date" className=' bg-zinc-100 text-black text-xs p-2 rounded-sm' />
              </div>

              <div className=' flex flex-col text-xs'>
                <label htmlFor="">End Date</label>
                <input value={end} onChange={(e) => setEnd(e.target.value)} type="date" className=' bg-zinc-100 text-black text-xs p-2 rounded-sm' />
              </div>
                {/* <input type="text" placeholder='Search Username' className=' p-2 rounded-sm text-xs bg-zinc-900 border-none' /> */}
                <button onClick={reset} className=' p-2 bg-blue-700 rounded-sm text-xs'>Reset</button>
            </div>

        </div>
        <Table className=' mt-24 md:mt-12'>
         {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
          {sales.length === 0 && (
          <TableCaption className=' text-xs'>No data</TableCaption>
          )}
        <TableHeader className=' border-slate-700'>
            <TableRow>
            <TableHead className=' text-center'>Date</TableHead>
          
            <TableHead className=' text-center' >Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">{new Date(item._id).toDateString()}</TableCell>
              <TableCell className="font-medium text-center">₱ {item.totalValue.toLocaleString()}</TableCell>
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

       


    </div>
  )
}
