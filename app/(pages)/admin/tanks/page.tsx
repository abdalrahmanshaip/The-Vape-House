import { getAllTanks } from '@/_actions/tanksAction'
import AdminDashboard from '@/app/shared/AdminDashboard'
import DeleteTank from '@/app/shared/DeleteTank'
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
import { TypeTanks } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'

const TanskAdminPage = async ({
  searchParams,
}: {
  searchParams: { page: string }
}) => {
  let page = parseInt(searchParams.page) || 1
  page = !page || page < 1 ? 1 : page
  const limit = 10
  const { data, totalCount } = await getAllTanks(limit, page)
  const totalPages = Math.ceil(totalCount! / limit)
  return (
    <AdminDashboard
      addItemName='Add Tank'
      title='Tanks Dashboard'
      hrefLink='tanks/add-tank'
    >
      <div className='mt-10'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tank Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>picture</TableHead>
              <TableHead>Max quantity</TableHead>
              <TableHead className='text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.tanks.length! > 0 ? (
              data?.tanks.map((tank: TypeTanks) => {
                const imgSrc = `data:${tank.img.contentType};base64,${tank.img.data}`
                return (
                  <TableRow key={tank._id}>
                    <TableCell>{tank.productName}</TableCell>
                    <TableCell>${tank.price}</TableCell>
                    <TableCell>
                      <Image
                        src={imgSrc}
                        alt={tank.productName}
                        width='80'
                        height='80'
                      />
                    </TableCell>
                    <TableCell>{tank.quantity}</TableCell>
                    <TableCell className='text-center'>
                      <DeleteTank _id={tank._id} />
                      <Button
                        asChild
                        variant={'ghost'}
                      >
                        <Link href={`/admin/tanks/${tank._id}`}>
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

export default TanskAdminPage
