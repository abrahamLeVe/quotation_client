"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardConfig } from "@/config/dashboard";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BsCreditCard } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function AuthMenu() {
  const { data: session, status } = useSession();
  const initials = `${session?.user.name?.charAt(0).toUpperCase() ?? ""}`;
  return (
    <>
      {status === "loading" ? (
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      ) : (
        <>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user.picture}
                      alt={session.user.email}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-50" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {dashboardConfig.sidebarNav.map((item) => (
                    <DropdownMenuItem asChild key={item.title + item.href}>
                      <Link href={item.href || ""}>
                        <>{item.icon}</>
                        {item.title}
                        <DropdownMenuShortcut>
                          ⌘{item.shortcut}
                        </DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  asChild
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                >
                  <div>
                    <IoExitOutline
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Salir
                    <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  Mi cuenta
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-50" align="end" forceMount>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/signin">
                      <MdOutlineSpaceDashboard
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Ingresar
                      <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">
                      <BsCreditCard
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Registro
                      <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      )}
    </>
  );
}
