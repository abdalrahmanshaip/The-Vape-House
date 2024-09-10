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

  useEffect(() => {
    if (limit) {
      router.push(`?limit=${limit}`)
    }
  }, [limit, router])

  return (
    <Select onValueChange={(value) => setLimit(value)}>
      <SelectTrigger>
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
  )
}

export default SelectItemPerPage
