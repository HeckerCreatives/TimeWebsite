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
import Spinner from '@/components/common/Spinner'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from '@/components/common/Pagination'
import axios from 'axios'
import { Search } from 'lucide-react'
import { levels } from '@/app/data'

type Unilevel = {
    createdAt: string
level: number
totalAmount: number
username: string
_id: string

}

export default function Unilevel() {

    const [unilevel, setUnilevel] = useState<Unilevel[]>([])
    const [level, setLevel] = useState('0')
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [search, setSearch] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const params = useSearchParams()
    const id = params.get('uid')

    useEffect(() => {
      setLoading(true)
    const getRequestHistory = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/unilevel/playeviewadminunilevel?playerid=${id}&level=${level}&page=${currentpage}&limit=10&search=${search}`,{
          withCredentials: true
        })
        setLoading(false)
        const dataAtLevel = response?.data?.data?.[0];
       

         if(dataAtLevel){
           setUnilevel(dataAtLevel.data)
           setTotalpage(dataAtLevel.totalPages)
         }else {
           setUnilevel([])
         }
       

      } catch (error) {
       
      }
     
    }
    getRequestHistory()
  },[currentpage, level])

   useEffect(() => {
    setLoading(true)
    const getRequestHistory = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/unilevel/playeviewadminunilevel?playerid=${id}&level=${level}&page=${currentpage}&limit=10&search=${search}`,{
          withCredentials: true
        })
        setLoading(false)
        setCurrentpage(0)
        const dataAtLevel = response?.data?.data?.[level];

        if(dataAtLevel){
          setUnilevel(dataAtLevel.data)
          setTotalpage(dataAtLevel.totalPages)
        }else {
          setUnilevel([])
        }
       
      } catch (error) {
       
      }
     
    }
    getRequestHistory()
  },[search])

  useEffect(() => {
    setCurrentpage(0)
  },[level])

  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }



  return (
    <div className=' flex flex-col items-center gap-6 w-full bg-zinc-800 min-h-[500px] p-4'>
       <div className=' w-full flex md:flex-row flex-col gap-6  justify-between'>
            <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-[200px] bg-zin-950">
                <SelectValue placeholder="Select Levels" />
            </SelectTrigger>
            <SelectContent className=' '>
                {levels.map((item, index) => (
                <SelectItem key={index} value={item.value}>{item.name}</SelectItem>
                ))}
                
            </SelectContent>
            </Select>

            <div className=' flex items-center gap-2'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Username' className=' p-2 rounded-sm text-xs bg-slate-800 border-none' />
                <button className=' p-2 bg-green-700 rounded-sm'><Search size={15}/></button>
            </div>


        </div>
        <Table className=''>
          {unilevel.length === 0 &&  
          <TableCaption className=' text-xs'>No data</TableCaption>
          }

          {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader className=' border-slate-700'>
            <TableRow>
            <TableHead className=' text-center'>Date</TableHead>
            <TableHead className=' text-center'>Username</TableHead>
            <TableHead className=' text-center'>Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {unilevel.map((item, index) => (
            <TableRow key={ index}>
            <TableCell className=' text-center'>{new Date(item.createdAt).toDateString()}</TableCell>
            <TableCell className=' text-center'>{item.username}</TableCell>
            <TableCell className=' text-center'>₱ {item.totalAmount}</TableCell>
            
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

             {unilevel.length !== 0 && (
               <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
             )}


    </div>
  )
}
