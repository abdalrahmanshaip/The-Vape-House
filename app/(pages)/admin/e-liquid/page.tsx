import { getAllLiquids } from '@/_actions/liquidAtion'
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
import { TypeLiquid, TypeVariation } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'

const LiquidAdminPage = async ({
  searchParams,
}: {
  searchParams: { page: string }
}) => {
  let page = parseInt(searchParams.page) || 1
  page = !page || page < 1 ? 1 : page
  const limit = 10
  const { data, totalCount } = await getAllLiquids(limit, page)
  const totalPages = Math.ceil(totalCount! / limit)
  return (
    <AdminDashboard
      addItemName='Add Liquid'
      title='Liquid Dashboard'
      hrefLink='e-liquid/add-liquid'
    >
      <div className='mt-10'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Liquid Name</TableHead>
              <TableHead>Size, Nic, Price</TableHead>
              <TableHead>picture</TableHead>
              <TableHead className='text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.liquids.length! > 0 ? (
              data?.liquids.map((liquid: TypeLiquid) => {
                const imgSrc = `data:${liquid.img.contentType};base64,${liquid.img.data}`
                return (
                  <TableRow key={liquid._id}>
                    <TableCell>{liquid.productName}</TableCell>
                    <TableCell className='space-y-4'>
                      {liquid.variations.map(
                        (variation: TypeVariation, index) => {
                          return (
                            <Button key={index} variant={'ghost'} className='w-fit flex flex-col'>
                              <p key={index}>
                                {variation.size} ML - {variation.nicotineType}{' '}
                                {variation.nicotine} Nic $ {variation.price} ,{' '}
                                Max quantity :{variation.quantity}
                              </p>
                            </Button>
                          )
                        }
                      )}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={imgSrc}
                        alt={liquid.productName}
                        width='80'
                        height='80'
                      />
                    </TableCell>
                    <TableCell className='text-center'>
                      <DeleteMod _id={liquid._id} />
                      <Button
                        asChild
                        variant={'ghost'}
                      >
                        <Link href={`/admin/e-liquid/${liquid._id}`}>
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

export default LiquidAdminPage
