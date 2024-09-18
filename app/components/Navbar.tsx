import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { MdOutlineAccountCircle, MdOutlineShoppingCart } from 'react-icons/md'
import Dropdown from './Dropdown'
import Image from 'next/image'
import Cart from './Cart'
const Navbar = async () => {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()
  const isAdmin = await getPermission('admin')
  const user = await getUser()

  return (
    <div className='navbar h-20 bg-muted'>
      <div className='container mx-auto px-5 lg:px-0 flex justify-between lg:justify-between items-center h-full'>
        <ul className='hidden lg:flex space-x-4'>
          <Link href={'/'}>Home</Link>
          <Link href={'https://wa.me/+201140458943'}>Whatsapp</Link>
        </ul>
        <Dropdown />
        <Link
          href={'/'}
          className='text-2xl text-center lg:-ml-14'
        >
          The Vape House
        </Link>
        <div className='flex space-x-5'>
          <Cart />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center cursor-pointer'>
                {isUserAuthenticated ? (
                  <>
                    <Image
                      src={user?.picture!}
                      alt={user?.given_name!}
                      className='rounded-full'
                      width={40}
                      height={40}
                    />
                  </>
                ) : (
                  <>
                    <MdOutlineAccountCircle
                      size={25}
                      className=''
                    />
                    <p className='hidden lg:block'></p>
                  </>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {isUserAuthenticated ? (
                  <LogoutLink className=''>
                    <DropdownMenuItem>logout</DropdownMenuItem>
                  </LogoutLink>
                ) : (
                  <LoginLink className=''>
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </LoginLink>
                )}
                {isAdmin?.isGranted && (
                  <Link
                    href={'/admin/disposable'}
                    prefetch={true}
                  >
                    <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Navbar
