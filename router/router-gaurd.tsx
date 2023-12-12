"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "./routes";

function RouteGuard({ children }: { children: JSX.Element }) {
  const router = useRouter();

  useEffect(() => {
    // on initial load - run auth check
    redirction(router.asPath);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", redirction);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeComplete", redirction);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function redirction(url: string) {
    const pathname = url.split("?")[0];

    if (pathname === "/") {
      router.push(ROUTES.books);
      return;
    }
  }

  return children;
}

export default RouteGuard;
