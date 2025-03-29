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
import {  RefreshCcw, Search } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import Spinner from '@/components/common/Spinner'
import Pagination from '@/components/common/Pagination'

interface  Commissions {
  totalAmount: number
  owner: string,
  username: string
}


export default function UnilevelCommissionTable() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [list, setList] = useState<Commissions[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const params = useSearchParams()
  const state = params.get('state')
  const [date, setDate] = useState('')
  const [end, setEnd] = useState('')
  const [search, setSeacrh] = useState('')





  useEffect(() => {
    setLoading(true)
    const handler = setTimeout( async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/analytics/getcommissionlist?startdate=${date}&enddate=${end}&page=${currentpage}&limit=10&search=${search}&type=commissionwallet`,{
          withCredentials:true
          })
         setList(response.data.data.data)
         setTotalpage(response.data.data.totalpages)
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
  },[currentpage, date, end, search])



  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }



  return (
    <div className=' relative w-full flex flex-col items-center max-w-[1440px] min-h-[500px] h-auto mt-12 bg-zinc-800 p-6'>
       <div className=' flex flex-col gap-1 items-start w-full'>
        <p className=' text-xs text-slate-500'>Filter by date:</p>

        <div className=' w-full flex gap-2 items-center flex-wrap lg:justify-between'>
          <div className=' flex items-center gap-4 flex-wrap'>
            <div className=' flex items-center gap-1'>
            <label htmlFor="" className=' text-xs text-slate-200'>Start date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className='bg-zinc-900 text-white p-1 text-xs rounded-sm' />
            </div>

            <div className=' flex items-center gap-1'>
              <label htmlFor="" className=' text-xs text-slate-200'>End date:</label>

              <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className='bg-zinc-900 text-white p-1 text-xs rounded-sm' />
            </div>
            
            
              <button onClick={() => {setDate(''),setCurrentpage(0), setEnd('')}} className=' bg-yellow-600 p-1 rounded-sm aspect-square'><RefreshCcw size={15}/></button>
          </div>

          <div>
            <input type="text" value={search} onChange={(e) => setSeacrh(e.target.value)} placeholder='Search e.g user 123'  className='bg-zinc-900 text-white p-2 text-xs rounded-sm' />
          </div>
        </div>
        
        
       </div>


        <Table className=' mt-6'>
        {list.length === 0 &&  
          <TableCaption className=' text-xs'>No data</TableCaption>
          }

          {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader className=' border-slate-700'>
            <TableRow>
            {/* <TableHead className=' text-center' >Created At</TableHead> */}
            {/* <TableHead className=' text-center'></TableHead> */}
            <TableHead className=' text-center'>Username</TableHead>
            <TableHead className=' text-center'>Commissions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>

          {list.map((item, index) => (
            <TableRow key={index}>
             

              {/* <TableCell className="font-medium text-center">{new Date(item.createdAt).toDateString()}</TableCell> */}
              {/* <TableCell className="font-medium text-center">{index + 1}</TableCell> */}
              <TableCell className="font-medium text-center">{item.username}</TableCell>
              <TableCell className={`font-medium text-center`}>₱{item.totalAmount.toLocaleString()}</TableCell>
             
            
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        {list.length !== 0 && (
        <div className=' mt-12'>
          <Pagination onPageChange={handlePageChange} total={totalpage} currentPage={currentpage}/>
        </div>
        )}

        


       


    </div>
  )
}
