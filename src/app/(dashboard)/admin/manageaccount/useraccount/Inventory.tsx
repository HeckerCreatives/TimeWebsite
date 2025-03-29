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
import Countdown from 'react-countdown'

type Miner = {
    minerid:string
    type: string
    buyprice: number
    profit: number
    duration: number
    earnings: number
    remainingtime: number
    purchasedate: string

}

export default function Inventory() {
    const params = useSearchParams()
    const id = params.get('uid')
    const [list, setList] = useState<Miner[]>([])
    const [loading, setLoading] = useState(false)
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)

    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getplayerinventoryforsuperadmin?playerid=${id}&page=${currentpage}&limit=10`,
                    {
                        withCredentials: true
                    }
                )
                setList(response.data.data.inventory)
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
                <TableHead className=' text-center'>Purchase Date</TableHead>
                <TableHead className=' text-center'>Price</TableHead>
                <TableHead className=' text-center'>Duration</TableHead>
                <TableHead className=' text-center'>Earnings</TableHead>
                <TableHead className=' text-center'>Profit</TableHead>
                <TableHead className=' text-center'>Remaining Time</TableHead>
                <TableHead className=' text-center'>Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(list).map((item, index) => (
                <TableRow key={index}>
                  <TableCell className=' text-center'>{new Date(item.purchasedate).toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.buyprice.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>{item.duration}</TableCell>
                  <TableCell className=' text-center'>₱ {item.earnings.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.profit.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>
                  <Countdown
                    className=' mt-2'
                        date={Date.now() + (item.remainingtime * 1000 )}
                        renderer={({ days, hours, minutes, seconds }) => (
                            <span className=' text-xs'>
                            Time left: {days} days : {hours} hours : {minutes} minutes : {seconds} seconds
                            </span>
                        )}
                    />
                  </TableCell>
                  <TableCell className=' text-center'>{item.type}</TableCell>
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
