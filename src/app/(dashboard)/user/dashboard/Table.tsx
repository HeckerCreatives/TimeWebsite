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
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import Spinner from '@/components/common/Spinner'
import Pagination from '@/components/common/Pagination'

type Miner = {
  amount: number
createdAt: string
fromusername: string
minername: string
type: string
username: string
}

type Credit = {
  amount: number
createdAt: string
fromusername: string
type: string
username: string
 minername: string

}

type TabData = {
  commissionwallet: Miner[];
  creditwallet: Credit[];
  minecoinwallet: Miner[];
  directcommissionwallet: Miner[];
};



type TabKeys = keyof TabData;

export default function DashboardTable() {

  const [tab, setTab] = useState('creditwallet')


  const [list, setList] = useState<Credit[]>([])
  const [comission, setComission] = useState<Credit[]>([])
  const [mine, setMine] = useState<Credit[]>([])
  const [ directcommission, setDirectcomission] = useState<Credit[]>([])
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
      const getHistory = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallethistory/userwallethistory?type=${tab}&page=${currentpage}&limit=10`,{
        withCredentials: true
        })
      setList(res.data.data.history)
      setTotalPage(res.data.data.pages)
      setLoading(false)
      }
      getHistory()
    
  },[ currentpage, tab])

  console.log(list)



  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  
  return (
    <div className=' relative w-full flex flex-col items-center gap-8 max-w-[1440px] min-h-[500px] h-auto mt-12 bg-zinc-800 p-6'>
        <div className=' absolute top-0 w-[98%] bg-yellow-500 p-2 rounded-sm -translate-y-4'>
            <Select value={tab} onValueChange={setTab} >
            <SelectTrigger className=" w-full max-w-[240px] bg-zinc-900 text-white">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="creditwallet">Load Balance History</SelectItem>
               <SelectItem value="chronocoinwallet">Chrono Wallet Earning History</SelectItem>
               <SelectItem value="commissionwallet">Commission History(Lvl 2-10)</SelectItem>
               <SelectItem value="directwallet">Referral History(Lvl 1)</SelectItem>
                {/* <SelectItem value="creditwallet">Credit Time Wallet History</SelectItem> */}
            </SelectContent>
            </Select>


        </div>

        <Table className=' mt-8'>
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
                </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className=' text-center'>{new Date(item.createdAt).toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.amount.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>{item.fromusername}</TableCell>
                </TableRow>
              ))}
                
            </TableBody>
            </Table>

             {list.length !== 0 && (
            < Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>

            )}

     

        

    </div>
  )
}
