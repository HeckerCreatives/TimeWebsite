'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useState } from 'react'

type PaginationProps = {
  currentPage: number
  total: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, total, onPageChange }: PaginationProps) {
  const next = () => {
    if (currentPage <= total) {
      onPageChange(currentPage + 1)
    }
  }

  const prev = () => {
    onPageChange(currentPage - 1)
  }

  return (
    <div className="flex items-center gap-1 text-xs">
      <button onClick={prev} disabled={currentPage === 0} className="bg-yellow-500 text-white p-2 rounded-sm">
        <ArrowLeft size={15} />
      </button>
      <p className="p-2 bg-zinc-700 aspect-square w-12 h-8 text-center rounded-sm">
        {currentPage + 1} / {total}
      </p>
      <button onClick={next} disabled={currentPage + 1 === total}  className="bg-yellow-500 text-white p-2 rounded-sm">
        <ArrowRight size={15} />
      </button>
    </div>
  )
}
