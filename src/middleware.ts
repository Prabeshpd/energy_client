import { NextRequest, NextResponse } from 'next/server';
import { getToken } from '@/helpers/authentication';

const middleware = async (req: NextRequest) => {
  const cookie = req.cookies.get('auth-cookie');
  const url = req.nextUrl.pathname;

  if (cookie && url.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!cookie && !url.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default middleware;
