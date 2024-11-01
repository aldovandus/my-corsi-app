import {
    GraduationCap,
    Home,
    Settings,
    SettingsIcon,
    Users2,
} from "lucide-react";

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
import { BreadcrumbRoute, User } from "@/types";
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

const items = [
    {
        title: "Home",
        url: route("dashboard"),
        icon: Home,
        isActiveSlug: "/",
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
    {
        title: "Impostazioni",
        url: route("profile.edit"),
        icon: SettingsIcon,
        isActiveSlug: "settings",
    },
];

export default function Authenticated({
    user,
    children,
    breadcrumbRoutes,
    showBreadcrumb
}: PropsWithChildren<{
    user: User;
    header?: ReactNode;
    breadcrumbRoutes?: BreadcrumbRoute[];
    showBreadcrumb?: boolean
}>) {
    const page = usePage();


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
                                            isActive={
                                                page.component ===
                                                    "Dashboard" &&
                                                    item.title === "Home"
                                                    ? true
                                                    : page?.url.includes(
                                                        `/${item.isActiveSlug}`
                                                    )
                                            }
                                            asChild
                                        >
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <Header showBreadcrumb={showBreadcrumb} user={user} breadcrumbRoutes={breadcrumbRoutes} />
                <main>{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
