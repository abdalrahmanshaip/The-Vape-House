import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { CiMenuBurger } from 'react-icons/ci'

const Dropdown = () => {
  const categorys = [
    { label: 'Disposable', path: '/disposable' },
    { label: 'Tanks', path: '/tanks' },
    { label: 'Pod System', path: '/pod-system' },
    { label: 'Mod', path: '/mod' },
    { label: 'E - Liquid', path: '/e-liquid' },
    { label: 'Coils & cartidges', path: '/coils-cartidges' },
    { label: 'Premium Liquid', path: '/premium-liquid' },
  ]
  return (
    <div className='lg:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <CiMenuBurger />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {categorys.map((category) => {
              return (
                <Link
                  href={`/collections/${category.path}`}
                  key={category.label}
                  prefetch={true}
                >
                  <DropdownMenuItem>{category.label}</DropdownMenuItem>
                </Link>
              )
            })}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={'/'}>
              <DropdownMenuItem>Home</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Dropdown
