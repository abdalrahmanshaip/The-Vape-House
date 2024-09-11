'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const SelectItemPerPage = () => {
  const router = useRouter()
  const [limit, setLimit] = useState<string>('')
  const [sort, setSort] = useState<string>('')

  useEffect(() => {
    if (limit || sort) {
      router.push(`?limit=${limit}&sort=${sort}`)
    }
  }, [limit, router, sort])

  return (
    <>
      <Select onValueChange={(value) => setLimit(value)}>
        <SelectTrigger className='w-[250px]'>
          <SelectValue placeholder='Items per page' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='15'>15</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='25'>25</SelectItem>
            <SelectItem value='30'>30</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setSort(value)}>
        <SelectTrigger>
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='price_asc'>Price: Low to High</SelectItem>
            <SelectItem value='price_desc'>Price: High to Low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export default SelectItemPerPage
