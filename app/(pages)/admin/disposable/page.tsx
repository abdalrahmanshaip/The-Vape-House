import {
  Pagination,
  PaginationContent,
  PaginationItem
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { getAllDesposable } from '@/_actions/disposableAction'
import AdminDashboard from '@/app/shared/AdminDashboard'
import DeleteDispo from '@/app/shared/DeleteDispo'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'
import { TypeDispo } from '@/Types'



const DisposableAdminPage = async ({
  searchParams,
}: {
  searchParams: { page: string }
}) => {
  let page = parseInt(searchParams.page) || 1
  page = !page || page < 1 ? 1 : page
  const limit = 10
  const { data, totalCount } = await getAllDesposable(limit, page)
  const totalPages = Math.ceil(totalCount! / limit)

  return (
    <AdminDashboard
      title='Disposable Dashboard'
      addItemName='Add Disposable'
      hrefLink='disposable/add-disposable'
    >
      <div className='mt-10'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DispoName</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>picture</TableHead>
              <TableHead>Flavar</TableHead>
              <TableHead>Max quantity</TableHead>
              <TableHead>Top dispo</TableHead>
              <TableHead className='text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.disposables.length! > 0 ? (
              data?.disposables.map((disposable: TypeDispo) => {
                const flavors = disposable.flavor.split(',')
                const imgSrc = `data:${disposable.img.contentType};base64,${disposable.img.data}`
                return (
                  <TableRow key={disposable._id}>
                    <TableCell>{disposable.productName}</TableCell>
                    <TableCell>${disposable.price}</TableCell>
                    <TableCell>
                      <Image
                        src={imgSrc}
                        alt={disposable.productName}
                        width='80'
                        height='80'
                      />
                    </TableCell>
                    <TableCell>
                      {flavors.map((flavor) => {
                        return (
                          <Button
                            key={flavor}
                            className='me-2'
                            variant={'ghost'}
                          >
                            {flavor}
                          </Button>
                        )
                      })}
                    </TableCell>
                    <TableCell>{disposable.quantity}</TableCell>
                    <TableCell>
                      {disposable.topDispo === 'true' ? 'true' : 'false'}
                    </TableCell>
                    
                    <TableCell className='text-center'>
                      <DeleteDispo _id={disposable._id} />
                      <Button asChild variant={'ghost'}>
                        <Link href={`/admin/disposable/${disposable._id}`}>
                        <MdEdit  size={30}/>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  className='text-center text-3xl'
                  colSpan={8}
                >
                  No Product available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination className='mt-10'>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <Button
                className={`${p === page && 'border bg-blue-500 text-white'} rounded-full`}
                variant={'ghost'}
                asChild
              >
                <Link href={`?page=${p}`}>{p}</Link>
              </Button>
            </PaginationItem>
          ))}
          
        </PaginationContent>
      </Pagination>
    </AdminDashboard>
  )
}

export default DisposableAdminPage
