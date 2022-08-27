import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
export const config = {
    matcher: ['/user/:path*'],
  }
export async function middleware(req:NextRequest,env:NextFetchEvent){
    ///console.log(req.cookies.get('token') )
    //if(token)return NextResponse.next()
    const token=await req.cookies.get('token')
    const url = req.nextUrl.clone()
    if(!token){
        url.pathname ='/auth/login'
       return NextResponse.rewrite( url)
    }
    url.pathname =req.nextUrl.pathname
  return NextResponse.rewrite( url)

     
}