import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorer les fichiers statiques
  const isStaticFile =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/public") ||
    pathname.match(/\.(.*)$/);

  if (isStaticFile) {
    return NextResponse.next();
  }

  // Vérifier si l'utilisateur est sur /admin/login
  const isLoginRoute = pathname === "/admin/login";

  if (isLoginRoute) {
    console.log("Accès à la page de login.");
    return NextResponse.next();
  }

  // Vérifier si la route commence par /admin mais n'est pas /admin/login
  const isProtectedRoute = /^\/admin(?!\/login).*/.test(pathname);

  if (isProtectedRoute) {
    const token = req.cookies.get("sessionId_sc")?.value;

    if (!token) {
      console.log("Token absent, redirection vers la page d'accueil.");
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  // Si la route ne nécessite pas de vérification
  return NextResponse.next();
}
