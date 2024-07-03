// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { verify } from 'jsonwebtoken';
import { parse } from 'cookie';
import * as api from '@/api/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Permitir requisições se estiver acessando a página de login ou API de autenticação
  if (pathname.includes('/admin/login') || pathname === '/admin/login') {
    return NextResponse.next();
  }
  

  const cookies = req.headers.get('cookie');
  if (!cookies) {
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  const parsedCookies = parse(cookies);
  const token = parsedCookies['token'];
  if (!token) {
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
    const logged = await api.isTokenValid();
    console.log(logged);

  // try {
  //   console.log(logged);
  //   if (!logged) {
  //     const loginUrl = new URL('/admin/login', req.url);
  //     return NextResponse.redirect(loginUrl);
  //   }
    
  //   return NextResponse.next();
  // } catch (err) {
  //   const loginUrl = new URL('/login', req.url);
  //   return NextResponse.redirect(loginUrl);
  // }
}

export const config = {
  matcher: ['/admin/:path*'], // Adicione as rotas que deseja proteger
};