import MyChrono from '@/components/common/MyChrono'
import Pagination from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import axios, { AxiosError } from 'axios'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



type Inventory ={
  buyprice: number
duration: number
earnings: number
chronoid: string
profit: number
purchasedate: string
remainingtime: number
type: string
maturedate: string       
isb1t1: boolean
name: string
promo: string
             
}

export default function Rigs() {
   const params = useSearchParams()
  const state = params.get('state')

  const quick = '/assets/quick-miner.png'
  const swift = '/assets/Swift-miner.png'
  const rapid = '/assets/Rapid-miner.png'
  const flash = '/assets/flash-miner.png'

  const [list, setList] = useState<Inventory[]>([])
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  

  
  useEffect(() => {
    setLoading(true)
    const getInventory = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getinventory?page=${currentpage}&limit=6`,{
          withCredentials: true
          })
        setList(res.data.data.chronos)
        setTotalPage(res.data.data.totalPages)
        
        setLoading(false)
        
      } catch (error) {
      }
     
    }
    getInventory()
  },[state, currentpage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const productImage = (name: string) => {
    if(name === 'Rolex AI Bot'){
      return '/A-Rolex.png'
    } else if(name === 'Patek Philippe AI Bot'){
      return '/B-Patek Philippe.png'
    } else {
      return '/C - Audemars Piguet.png'
    }
   }
  
   const productImageSize = (name: string) => {
    if(name === 'Rolex AI Bot'){
      return '150'
    } else if(name === 'Patek Philippe AI Bot'){
      return '220'
    } else {
      return '300'
    }
   }


  return (

    <div className=' w-full flex flex-col gap-8 items-center justify-center'>
      {Object.values(list).length === 0 ? (
        <div className=' w-full flex items-center justify-center h-[200px]'>
          <p className=' text-sm text-zinc-400'>No Inventory</p>

        </div>
      ): (
        <>
        {loading ? (
          <div className=' w-full h-[500px] flex items-center justify-center'>
            <Spinner/>
          </div>
        ): (
          <div className=' w-full max-w-[1740px] grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-4'>

            {Object.values(list).map((item, index) => (
              <MyChrono id={item.chronoid} key={index} name={item.name} percentage={`${item.profit * 100}`} duration={item.duration} img={productImage(item.name)} size={productImageSize(item.name)} earnings={(item.isb1t1 ? item.price * item.profit : item.earnings)} timeleft={item.remainingtime} purchase={new Date(item.purchasedate).toLocaleString()} max={item.buyprice} buyprice={item.buyprice} b1t1={item.isb1t1} maturedate={item.maturedate} promo={item.promo}/>

            ))}


        </div>
        )}
        
        </>
        
      )}

      {/* <div className=' w-full max-w-[1740px] grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-4'>
        <MyChrono id={''} name={'Rolex Ai Bot'} percentage={undefined} duration={0} img={'/A-Rolex.png'} size={'150'} max={0} earnings={0} timeleft={0} purchase={undefined} buyprice={undefined} b1t1={''} maturedate={''}/>
        <MyChrono id={''} name={'Rolex Ai Bot'} percentage={undefined} duration={0} img={'/A-Rolex.png'} size={'150'} max={0} earnings={0} timeleft={0} purchase={undefined} buyprice={undefined} b1t1={''} maturedate={''}/>

        <MyChrono id={''} name={'Patek Philippe Ai Bot'} percentage={undefined} duration={0} img={'/B-Patek Philippe.png'} size={'220'} max={0} earnings={0} timeleft={0} purchase={undefined} buyprice={undefined} b1t1={''} maturedate={''}/>

      </div> */}


      {Object.values(list).length !== 0 && (
       <Pagination onPageChange={handlePageChange} total={totalpage} currentPage={currentpage}/>

      )}
    </div>
   
  )
}
