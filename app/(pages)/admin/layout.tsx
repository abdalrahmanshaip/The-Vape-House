import { categorys } from '@/app/components/Category'
import Loading from '@/app/loading'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import Link from 'next/link'
import { ReactNode, Suspense } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=''>
      <div className='sidebar_in_mobile_media lg:hidden block container mx-auto mt-5 px-5'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline'>Categorys</Button>
          </SheetTrigger>
          <SheetContent side={'left'}>
            <SheetHeader>
              <SheetTitle>Category list</SheetTitle>
            </SheetHeader>
            <SheetDescription>
              Select a category to manage products.
            </SheetDescription>
            <div className='space-y-10 ms-5 mt-10'>
              {categorys.map((category, index) => {
                return (
                  <Link
                    key={category.label}
                    href={`/admin/${category.path}`}
                    className='hover:border-b-2 block'
                  >
                    {index + 1}- {category.label}
                  </Link>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className='flex'>
        <div className='sidebar_in_larg_media hidden lg:block bg-muted h-screen w-[15%]'>
          <div className='space-y-10 ms-10 mt-10'>
            {categorys.map((category, index) => {
              return (
                <Link
                  key={category.label}
                  href={`/admin/${category.path}`}
                  className='hover:border-b-2 border-black block h-7'
                >
                  {index + 1}- {category.label}
                </Link>
              )
            })}
          </div>
        </div>
        <div className='container mx-auto mt-5 px-5'>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  )
}

export default layout
