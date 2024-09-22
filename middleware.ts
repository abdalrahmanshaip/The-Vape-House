import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const { getPermission } = await getKindeServerSession()
  const isAdmin = await getPermission('admin')
  const path = req.nextUrl.pathname
  const isProtectedRoute = path.startsWith('/admin/')
  if (isProtectedRoute && !isAdmin?.isGranted) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}
