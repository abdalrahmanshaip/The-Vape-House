import { getAllMod } from '@/_actions/modAtion'
import AdminDashboard from '@/app/shared/AdminDashboard'
import DeleteMod from '@/app/shared/DeleteMod'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TypeMod } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'

const ModAdminPage = async ({
  searchParams,
}: {
  searchParams: { page: string }
}) => {
  let page = parseInt(searchParams.page) || 1
  page = !page || page < 1 ? 1 : page
  const limit = 10
  const { data, totalCount } = await getAllMod(limit, page)
  const totalPages = Math.ceil(totalCount! / limit)
  return (
    <AdminDashboard
      addItemName='Add Mod'
      title='Mod Dashboard'
      hrefLink='mod/add-mod'
    >
      <div className='mt-10'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pod Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>picture</TableHead>
              <TableHead>colors</TableHead>
              <TableHead>Max quantity</TableHead>
              <TableHead className='text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.mods.length! > 0 ? (
              data?.mods.map((pod: TypeMod) => {
                const colors = pod.colors.split(',')
                const imgSrc = `data:${pod.img.contentType};base64,${pod.img.data}`
                return (
                  <TableRow key={pod._id}>
                    <TableCell>{pod.productName}</TableCell>
                    <TableCell>${pod.price}</TableCell>
                    <TableCell>
                      <Image
                        src={imgSrc}
                        alt={pod.productName}
                        width='80'
                        height='80'
                      />
                    </TableCell>
                    <TableCell>
                      {colors.map((color) => {
                        return (
                          <Button
                            key={color}
                            className='me-2'
                            variant={'ghost'}
                          >
                            {color}
                          </Button>
                        )
                      })}
                    </TableCell>
                    <TableCell>{pod.quantity}</TableCell>
                    <TableCell className='text-center'>
                      <DeleteMod _id={pod._id} />
                      <Button
                        asChild
                        variant={'ghost'}
                      >
                        <Link href={`/admin/mod/${pod._id}`}>
                          <MdEdit size={30} />
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
                className={`${
                  p === page && 'border bg-blue-500 text-white'
                } rounded-full`}
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

export default ModAdminPage
