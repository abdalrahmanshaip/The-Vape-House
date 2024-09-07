import Link from 'next/link'

export const categorys = [
  { label: 'Disposable', path: '/disposable' },
  { label: 'Tanks', path: '/tanks' },
  { label: 'Pod System', path: '/pod-system' },
  { label: 'Mod', path: '/mod' },
  { label: 'E - Liquid', path: '/e-liquid' },
  { label: 'Coils & cartidges', path: '/coils-cartidges' },
  { label: 'Premium Liquid', path: '/premium-liquid' },
]
const Category = () => {
  return (
    <div className='hidden lg:flex items-center  h-14  bg-gradient-to-r  from-black  to-white'>
      <div className='flex space-x-10 container mx-auto text-white'>
        {categorys.map((category) => {
          return (
            <Link
              key={category.label}
              href={category.path}
              className='hover:border-b-2'
            >
              {category.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Category
