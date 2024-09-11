'use client'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const SelectItemPerPage = () => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')
  console.log(search)
  const [limit, setLimit] = useState<string>('')
  const [sort, setSort] = useState<string>('')

  useEffect(() => {
    const params = new URLSearchParams()
    if (search.trim()) {
      params.set('search', search)
    }
    if (limit) {
      params.set('limit', limit)
    }
    if (sort) {
      params.set('sort', sort)
    }
    router.push(`?${params.toString()}`)
  }, [limit, sort, search, router])

  return (
    <div className='filtration flex flex-wrap gap-x-5 justify-between'>
      <div className='basis-full mb-5 md:basis-1/2 flex relative'>
        <Input
          name='search'
          placeholder='Search'
          className=''
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='select flex gap-x-5'>
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
      </div>
    </div>
  )
}

export default SelectItemPerPage
