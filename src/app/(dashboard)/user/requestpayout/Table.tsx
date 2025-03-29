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
import Pagination from '@/components/common/Pagination'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Spinner from '@/components/common/Spinner'

type History = {
  date : string
grossamount : number
netammount : number
status : string
withdrawalfee: number
}

export default function PayoutTable() {

  const [history, setHistory] = useState<History[]>([])

  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const params = useSearchParams()
  const state = params.get('state')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getRequestHistory = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/payout/getrequesthistoryuser?page=${currentpage}&limit=10`,{
        withCredentials: true
      })

      setHistory(response.data.data.history)
      setTotalpage(response.data.data.totalPages)

    setLoading(false)

    }
    getRequestHistory()
  },[currentpage, state])

  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  


  return (
    <div className=' relative w-full flex flex-col items-center gap-8 max-w-[1440px] min-h-[500px] h-auto mt-12 bg-zinc-800 p-6'>
        <div className=' h-[55px] flex items-center justify-between absolute top-0 w-[98%] bg-yellow-500 p-2 rounded-sm -translate-y-4'>
         

            <p className=' text-sm text-black font-semibold'>Commission Payout History</p>


        </div>
        <Table className=' mt-8'>
           {history.length === 0 && (
              <TableCaption className=' text-xs'>No data</TableCaption>
            )}
             {loading === true && (
              <TableCaption className=' '>
                <Spinner/>
              </TableCaption>
            )}
        <TableHeader className=' border-slate-700'>
            <TableRow>
            <TableHead className=' text-center'>Date</TableHead>
            <TableHead className=' text-center'>Gross Amount</TableHead>
            <TableHead className=' text-center'>Net Amount</TableHead>
            <TableHead className=' text-center'>Withdrawal Fee</TableHead>
            <TableHead className=' text-center'>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {loading === false && (
            <>
            {history.map((item, index) => (
            <TableRow key={index}>
            <TableCell className=" text-center">{new Date(item.date).toLocaleString()}</TableCell>
            <TableCell className=' text-center'>₱ {(item.grossamount || 0).toLocaleString()}</TableCell>
            <TableCell className=' text-center'>₱ {(item.netammount || 0).toLocaleString()}</TableCell>
            <TableCell className=" text-center">₱ {item.withdrawalfee.toLocaleString()}</TableCell>
            <TableCell className=" text-center">{item.status}</TableCell>
            {/* <TableCell className={`text-center ${item.status.toLowerCase() === 'in review' && ' text-blue-500'}
            ${item.status === 'reject' && ' text-red-500'}
            ${item.status === 'done' && ' text-green-500'}
            `}>{item.status === 'done' && 'Approved'} {item.status === 'reject' && 'Rejected'} {item.status.toLocaleLowerCase() === 'in review' && 'In Review'}</TableCell> */}
            </TableRow>
          ))}
            </>
          )}
          
            
        </TableBody>
        </Table>

        {history.length !== 0 && (
          <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        )}

    </div>
  )
}
