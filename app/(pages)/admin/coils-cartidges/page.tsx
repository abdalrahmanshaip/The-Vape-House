import { getAllCoilsCartidges } from '@/_actions/coilsCartidgeAction'
import AdminDashboard from '@/app/shared/AdminDashboard'
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
import Image from 'next/image'
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'
import { TypeCoildsCartidge } from '@/Types'
import DeleteCoilCartidge from '@/app/shared/DeleteCoilCartidge'

const ConilsCartidgesAdminPage = async ({
  searchParams,
}: {
  searchParams: { page: string }
}) => {
  let page = parseInt(searchParams.page) || 1
  page = !page || page < 1 ? 1 : page
  const limit = 10
  const { data, totalCount } = await getAllCoilsCartidges(limit, page)
  const totalPages = Math.ceil(totalCount! / limit)
  return (
    <AdminDashboard
      addItemName='Add coils and cartidges'
      title='Conils Cartidges Dashboard'
      hrefLink='coils-cartidges/add-coils-cartidges'
    >
      <div className='mt-10'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coilds | Cartidge Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>resistance</TableHead>
              <TableHead>picture</TableHead>
              <TableHead>quantity</TableHead>
              <TableHead className='text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.coildsCartidges.length! > 0 ? (
              data?.coildsCartidges.map(
                (coildsCartidge: TypeCoildsCartidge) => {
                  const resistances = coildsCartidge.resistance.split(',')
                  const imgSrc = `data:${coildsCartidge.img.contentType};base64,${coildsCartidge.img.data}`
                  return (
                    <TableRow key={coildsCartidge._id}>
                      <TableCell>{coildsCartidge.productName}</TableCell>
                      <TableCell>{coildsCartidge.price}</TableCell>
                      <TableCell>
                        {resistances.map((resistance) => {
                          return (
                            <Button
                              key={resistance}
                              className='me-2'
                              variant={'ghost'}
                            >
                              {resistance}
                            </Button>
                          )
                        })}
                      </TableCell>
                      <TableCell>
                        <Image
                          src={imgSrc}
                          alt={coildsCartidge.productName}
                          width='80'
                          height='80'
                        />
                      </TableCell>
                      <TableCell>{coildsCartidge.quantity}</TableCell>
                      <TableCell className='text-center'>
                        <DeleteCoilCartidge _id={coildsCartidge._id} />
                        <Button
                          asChild
                          variant={'ghost'}
                        >
                          <Link
                            href={`/admin/coils-cartidges/${coildsCartidge._id}`}
                          >
                            <MdEdit size={30} />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                }
              )
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

export default ConilsCartidgesAdminPage
