'use client'
import Productcard from '@/components/common/Productcard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Chrono = {
  duration: number
id: string
isBuyonetakeone: string
max: number
min: number
name: string
profit: number
type: string
canbuy: boolean
isunlock: boolean
}

export default function Product() {
  const [list, setList] = useState<Chrono[]>([])

  useEffect(() => {

    const getState = async () => {
     const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/chrono/getchrono`,{
         withCredentials: true
     })
     setList(response.data.data)
    }
    getState()
 },[])

  useEffect(() => {
    const getState = async () => {

    }
  }, [])

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
    <div className=' w-full max-w-[1740px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4'>
      {list.map((item, index) => (
        <Productcard name={item.name} percentage={`${(item?.profit) * 100}`} duration={`${item?.duration}`} min={item?.min} max={item.max} img={productImage(item.name)} size={`${productImageSize(item.name)}`} b1t1={item?.isBuyonetakeone} type={item.type} canbuy={item.canbuy} isunlock={item.isunlock}/>
      ))}
        {/* <Productcard name={'Rolex Ai Bot'} percentage={`${(quick?.profit || 0) * 100}`} duration={`${quick?.duration}`} min={quick?.min || 0} max={quick?.max || 0} img={'/A-Rolex.png'} size={'150'} b1t1={quick?.isBuyonetakeone || ''}/>
        <Productcard name={'Patek Philippe Ai Bot'} percentage={`${(swift?.profit || 0) * 100}`} duration={`${swift?.duration}`} min={swift?.min || 0} max={swift?.max || 0} img={'/B-Patek Philippe.png'} size={'220'} b1t1={swift?.isBuyonetakeone || ''}/>
        <Productcard name={'Audemars Piguet Ai Bot'} percentage={`${(rapid?.profit || 0) * 100}`} duration={`${rapid?.duration}`} min={rapid?.min || 0} max={rapid?.max || 0} img={'/C - Audemars Piguet.png'} size={'500'} b1t1={rapid?.isBuyonetakeone || ''}/> */}
    </div>
  )
}
