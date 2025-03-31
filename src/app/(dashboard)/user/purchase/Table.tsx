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
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Pagination from '@/components/common/Pagination'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import Spinner from '@/components/common/Spinner'
import toast from 'react-hot-toast'

type Info = {
  amount: number
  createdAt: string
  chronotype: string
}

export default function PurchaseHistoryTable() {
  const params = useSearchParams()
  const state = params.get('state')

  const [list, setList] = useState<Info[]>([])
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const getBuyHistory = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getbuyhistory?limit=10&page=${currentpage}`,{
          withCredentials: true
          })
        setList(res.data.data.history)
        setTotalPage(res.data.data.totalpages)
        setLoading(false)
        
      } catch (error) {
        // if (axios.isAxiosError(error)) {
        //         const axiosError = error as AxiosError<{ message: string, data: string }>;
        //             if (axiosError.response && axiosError.response.status === 401) {
        //             toast.error(`${axiosError.response.data.data}`)
        //             router.push('/')  
        //             }    
        //         } 
      }
     
    }
    getBuyHistory()
  },[state, currentpage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const formatString = (data: string) => {
    return data
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


  return (
    <div className=' relative w-full flex flex-col items-center gap-8 max-w-[1740px] min-h-[500px] h-auto mt-12 bg-zinc-800 p-6'>
        <div className=' h-[55px] flex items-center justify-between absolute top-0 w-[98%] bg-yellow-500 p-2 rounded-sm -translate-y-4'>
            {/* <Select>
            <SelectTrigger className="w-[200px] bg-zinc-900">
                <SelectValue placeholder="Select Levels" />
            </SelectTrigger>
            <SelectContent>
                {levels.map((item, index) => (
                <SelectItem key={index} value={item.value}>{item.name}</SelectItem>

                ))}
                
            </SelectContent>
            </Select>

            <div className=' flex items-center gap-2'>
                <input type="text" placeholder='Search Username' className=' p-2 rounded-sm text-xs bg-zinc-900 border-none' />
                <button className=' p-2 bg-green-700 rounded-sm'><Search size={15}/></button>
            </div> */}

            <p className=' text-sm text-black font-semibold'>Purchase History</p>


        </div>
        <Table className=' mt-8'>
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
            <TableHead className=' text-center'>Purchased Date</TableHead>
            <TableHead className=' text-center'>Amount</TableHead>
            <TableHead className=' text-center'>Type</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {loading === false && (
            <>
            {list.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{new Date(item.createdAt).toDateString()}</TableCell>
                <TableCell className=' text-center'>₱ {item.amount?.toLocaleString()}</TableCell>
                <TableCell className=' text-center'>{formatString(item.chronotype)}</TableCell>
              </TableRow>
            ))}
            </>
          )}
          
            
        </TableBody>
        </Table>

        {/* <div className=' flex items-center gap-1 text-xs'>
            <button className=' bg-green-500 text-white p-2 rounded-sm'><ArrowLeft size={15}/></button>

            <p className=' p-2 bg-slate-700 aspect-square w-8 h-8 text-center rounded-sm'>0</p>
            <button className=' bg-green-500 text-white p-2 rounded-sm'><ArrowRight size={15}/></button>
        </div> */}

        {list.length !== 0 && (
          <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        )}


    </div>
  )
}
