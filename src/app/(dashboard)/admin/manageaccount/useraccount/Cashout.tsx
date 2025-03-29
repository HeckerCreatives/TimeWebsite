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
import Spinner from '@/components/common/Spinner'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Pagination from '@/components/common/Pagination'

type Payout = {
    date: string
grossamount: number
netammount: number
status: string
withdrawalfee: number

}

export default function Cashout() {
    const params = useSearchParams()
    const id = params.get('uid')
    const [list, setList] = useState<Payout[]>([])
    const [loading, setLoading] = useState(false)
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)

    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/payout/getrequesthistoryplayerforsuperadmin?userid=${id}&page=${currentpage}&limit=10`,
                    {
                        withCredentials: true
                    }
                )
                setList(response.data.data.history)
                setTotalpage(response.data.data.totalPages)
                setLoading(false)

                
                
            } catch (error) {
                
                
            }
        
        }

        getWallets()
     
     },[currentpage])


    const handlePageChange = (page: number) => {
        setCurrentpage(page)
    }

    
  return (
    <div className=' w-full flex flex-col gap-8 items-center bg-zinc-800 min-h-[500px] p-4'>
        <Table className=''>
            {list.length === 0 && (
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
                <TableHead className=' text-center'>Approved Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className=' text-center'>{new Date(item.date).toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.grossamount.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.netammount.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.withdrawalfee.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>{item.status}</TableCell>
                </TableRow>
              ))}
                
            </TableBody>
            </Table>

             {list.length !== 0 && (
            <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>

            )}

    </div>
  )
}
