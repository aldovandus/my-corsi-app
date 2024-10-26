import { GraduationCap, Home, Settings, Users2 } from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Link, router, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import SidebarLink from "./SidebarLink";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/Components/ui/sidebar";
import { Header } from "./header";

type BreadcrumbRoute = {
    url: string;
    label: string;
};

export default function Authenticated({
    user,
    children,
    breadcrumbRoutes,
}: PropsWithChildren<{
    user: User;
    header?: ReactNode;
    breadcrumbRoutes?: BreadcrumbRoute[];
}>) {
    const page = usePage();

    const items = [
        {
            title: "Home",
            url: route("dashboard"),
            icon: Home,
            isActiveSlug: "",
        },

        {
            title: "Clienti",
            url: route("customer.index"),
            icon: Users2,
            isActiveSlug: "customer",
        },
        {
            title: "Corsi",
            url: route("course.index"),
            icon: GraduationCap,
            isActiveSlug: "courses",
        },
    ];

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Menu</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={page?.url.includes(
                                                `/${item.isActiveSlug}`
                                            )}
                                            asChild
                                        >
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <Header user={user} breadcrumbRoutes={breadcrumbRoutes} />
                <main>{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    {/*   <Link
                        href="#"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full  text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Entemaxwell</span>
                    </Link> */}

                    <SidebarLink
                        href={route("dashboard")}
                        label="Dashboard"
                        isSelected={page?.component === "Dashboard"}
                    >
                        <Home className="h-5 w-5" />
                        <span className="sr-only">Dashboard</span>
                    </SidebarLink>

                    <SidebarLink
                        href={route("customer.index")}
                        label="Clienti"
                        isSelected={page?.url.includes("/customer")}
                    >
                        <Users2 className="h-5 w-5" />
                        <span className="sr-only">Clienti</span>
                    </SidebarLink>

                    <SidebarLink
                        href={route("course.index")}
                        label="Corsi"
                        isSelected={page?.url.includes("/courses")}
                    >
                        <GraduationCap className="h-5 w-5" />
                        <span className="sr-only">Corsi</span>
                    </SidebarLink>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Settings
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={route("dashboard")}>
                                        Dashboard
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {breadcrumbRoutes?.map(({ url, label }, index) => (
                                <>
                                    {<BreadcrumbSeparator />}

                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href={route(url)}>
                                                {label}
                                            </Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </>
                            ))}
                            {/*  <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Orders</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Recent Orders</BreadcrumbPage>
                            </BreadcrumbItem> */}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="relative ml-auto flex-1 md:grow-0">
                        {/*   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        /> */}
                        <div className="flex items-center gap-2 min-w-[130px]">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="overflow-hidden rounded-full"
                                    >
                                        {/* <img
                                        src="/placeholder-user.jpg"
                                        width={36}
                                        height={36}
                                        alt="Avatar"
                                        className="overflow-hidden rounded-full"
                                    /> */}
                                        <Avatar>
                                            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                            {user.name && (
                                                <AvatarFallback>
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Il mio account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => router.get("profile")}
                                    >
                                        Profilo
                                    </DropdownMenuItem>
                                    {/*   <DropdownMenuItem>
                                        Supporto
                                    </DropdownMenuItem> */}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => router.post("logout")}
                                    >
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="">ciao {user.name}</div>
                        </div>
                    </div>
                </header>
                {children}
            </div>
        </div>
    );
}
