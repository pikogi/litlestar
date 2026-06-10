import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  if (pathname.startsWith("/panel") && pathname !== "/panel/login") {
    if (!user) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = "/panel/login"
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname === "/panel/login" && user) {
    const panelUrl = request.nextUrl.clone()
    panelUrl.pathname = "/panel"
    return NextResponse.redirect(panelUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/panel/:path*"],
}
