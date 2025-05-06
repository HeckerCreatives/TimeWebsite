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
import Pagination from '@/components/common/Pagination'
import axios from 'axios'
import { list } from 'postcss'

type Claim = {
  amount: number
createdAt: string
chronotype: string

}


export default function ClaimHistoryTable() {

   const [history, setHistory] = useState<Claim[]>([])

  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)

  useEffect(() => {
    const getRequestHistory = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getclaimhistory?page=${currentpage}&limit=10`,{
        withCredentials: true
      })

      setHistory(response.data.data.history)
      setTotalpage(response.data.data.totalpages)

    }
    getRequestHistory()
  },[currentpage])

  const handlePageChange = (page: number) => {
    setCurrentpage(page)
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
          

            <p className=' text-sm text-black font-semibold'>Claim History</p>


        </div>
        <Table className=' mt-8'>
          {history.length === 0 &&
          <TableCaption className=' text-xs'>No data</TableCaption>
          }
        <TableHeader className=' border-slate-700'>
            <TableRow>
            <TableHead className=' text-center'>Date</TableHead>
            <TableHead className=' text-center'>Price</TableHead>
            <TableHead className=' text-center'>Chrono Package Name</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item, index) => (
            <TableRow key={index}>
              <TableCell className=' text-center'>{new Date(item.createdAt).toDateString()}</TableCell>
              <TableCell className=' text-center'>₱ {item.amount.toLocaleString()}</TableCell>
              <TableCell className=' text-center'>{formatString(item.chronotype)}</TableCell>
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        {/* <div className=' flex items-center gap-1 text-xs'>
            <button className=' bg-green-500 text-white p-2 rounded-sm'><ArrowLeft size={15}/></button>

            <p className=' p-2 bg-slate-700 aspect-square w-8 h-8 text-center rounded-sm'>0</p>
            <button className=' bg-green-500 text-white p-2 rounded-sm'><ArrowRight size={15}/></button>
        </div> */}
        {history.length !== 0 && (
          <Pagination onPageChange={handlePageChange} total={totalpage} currentPage={currentpage}/>

        ) }

    </div>
  )
}
