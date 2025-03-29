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

type Payin = {
    createdAt: string
owner: string
processby: string
status: string
value: number
}

export default function Cashin() {
    const params = useSearchParams()
    const id = params.get('uid')
    const [list, setList] = useState<Payin[]>([])
    const [loading, setLoading] = useState(false)
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)

    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/payin/getpayinhistoryplayerforsuperadmin?userid=${id}&page=${currentpage}&limit=10`,
                    {
                        withCredentials: true
                    }
                )
                setList(response.data.data.payinhistory)
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
                <TableHead className=' text-center'>Amount</TableHead>
                <TableHead className=' text-center'>From</TableHead>
                <TableHead className=' text-center'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className=' text-center'>{new Date(item.createdAt).toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.value.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>{item.processby}</TableCell>
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
