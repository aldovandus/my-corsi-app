import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { Link, router } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import { BreadcrumbRoute, User } from "@/types";

const Header = ({
    breadcrumbRoutes,
    user,
    showBreadcrumb = true
}: {
    user: User;
    breadcrumbRoutes?: BreadcrumbRoute[];
    showBreadcrumb?: boolean
}) => {
    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                {showBreadcrumb && <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={route("dashboard")}>Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumbRoutes?.map(({ url, label, urlParams }, index) => (
                            <>
                                {<BreadcrumbSeparator />}

                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        {url ? <Link href={route(url, urlParams)}>{label}</Link> : <span>{label}</span>}

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
                </Breadcrumb>}
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
        </div>
    );
};

export { Header };
