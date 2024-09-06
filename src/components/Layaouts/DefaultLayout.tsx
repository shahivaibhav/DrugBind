"use client";

import React, { useState, useLayoutEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {data :Session, status} = useSession();

  const router = useRouter();

  const pathName = usePathname();

  const publicRoute = [
    "/auth-page/signin",
    "/auth-page/signup",
    "/verify-email",
    "/reset-password",
    "/forget-password"
  ]

  useLayoutEffect(() => {
    if(status === 'unauthenticated' && !publicRoute.includes(pathName)){
      router.push('/auth-page/signin')
    }
  }, [router, pathName])

  return (
    <div className="flex">
      {/* sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-1 flex-col lg:ml-72.5">
        {/* header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>


        <main>
          <div className="mx-auto max-w-screen-2xl p-4 dark:bg-[#121212] md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

