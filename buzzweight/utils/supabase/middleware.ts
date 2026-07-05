import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // Never run auth/session handling on API routes. Creating the Supabase server
  // client here reads the request and re-emits it via NextResponse.next({ request }),
  // which drops the POST body before it reaches route handlers (e.g. /api/data) on
  // Vercel. API routes authenticate themselves.
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next({ request: { headers: request.headers } });
  }

  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();

    // protected routes
    if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (request.nextUrl.pathname === "/" && !user.error) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    return response;
  } catch (e) {
    // A Supabase client could not be created — usually missing env vars.
    // NOTE: this disables route protection, so make it loud rather than silent.
    console.warn(
      "[middleware] updateSession failed; route protection is disabled for this request:",
      e,
    );
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
