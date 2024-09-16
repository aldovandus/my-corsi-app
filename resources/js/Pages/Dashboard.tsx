import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Course, CustomerWithSubscription, PageProps } from "@/types";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/Components/ui/card";

import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from "@/Components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/Components/ui/button";
import {
    Activity,
    ArrowUpRight,
    CreditCard,
    EuroIcon,
    Users,
} from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import formatDate from "@/lib/hooks/formatDate";

export default function Dashboard({
    auth,
    subscriptionsCount,
    customersCount,
    coursesCount,
    latestSubscriptions,
    courses,
}: PageProps<{
    customersCount: number;
    coursesCount: number;
    subscriptionsCount: number;
    latestSubscriptions: CustomerWithSubscription[];
    courses: Course[];
}>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            /*  header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            } */
        >
            <Head title="Dashboard" />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Totale Iscrizioni
                            </CardTitle>
                            <EuroIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">€2000</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Clienti
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{customersCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +180.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Corsi
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {coursesCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card
                        className="xl:col-span-2"
                        x-chunk="dashboard-01-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Iscrizioni</CardTitle>
                                <CardDescription>
                                    Ultime iscrizioni effettuate.
                                </CardDescription>
                            </div>
                            <Button
                                disabled={latestSubscriptions.length === 0}
                                asChild
                                size="sm"
                                className="ml-auto gap-1"
                            >
                                <Link href="#">
                                    Vedi tutte
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {latestSubscriptions.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead className="hidden xl:table-column">
                                                Type
                                            </TableHead>
                                            <TableHead className="">
                                                Corso
                                            </TableHead>
                                            <TableHead className=" ">
                                                Data Iscrizione
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Prezzo
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {latestSubscriptions.map(
                                            (subscription) => (
                                                <TableRow key={subscription.id}>
                                                    <TableCell>
                                                        <Link
                                                            className=""
                                                            href={route(
                                                                "customer.show",
                                                                subscription.id
                                                            )}
                                                        >
                                                            <div className="font-medium">
                                                                {`${subscription.firstname} ${subscription.lastname}`}
                                                            </div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                {
                                                                    subscription.email
                                                                }
                                                            </div>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell className="xl:table-column">
                                                        Corso
                                                    </TableCell>
                                                    <TableCell className=" ">
                                                        <Link
                                                            href={route(
                                                                "course.show",
                                                                subscription.course_id
                                                            )}
                                                        >
                                                            <Badge
                                                                className="text-xs"
                                                                variant="outline"
                                                            >
                                                                {
                                                                    subscription.code
                                                                }
                                                                -
                                                                {
                                                                    subscription.title
                                                                }
                                                            </Badge>
                                                        </Link>
                                                    </TableCell>

                                                    <TableCell className=" ">
                                                        {subscription.subscription_date
                                                            ? formatDate(
                                                                  subscription.subscription_date
                                                              )
                                                            : ""}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        € {subscription.price}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div>Non ci sono iscrizioni al momento.</div>
                            )}
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle>Corsi Recenti</CardTitle>
                            {courses.length === 0 && (
                                <CardDescription>
                                    Nessun corso al momento.
                                </CardDescription>
                            )}
                        </CardHeader>
                        {courses.length > 0 && (
                            <CardContent className="grid gap-8">
                                {courses.map((course) => (
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage
                                                src="/avatars/01.png"
                                                alt="Avatar"
                                            />
                                            <AvatarFallback>
                                                {course.code}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            {/*    <p className="text-sm font-medium leading-none">
                                            {course.code}
                                        </p> */}
                                            <p className="text-sm text-muted-foreground">
                                                {course.title}
                                            </p>
                                            <p className="text-sm">
                                                {formatDate(course.startDate)}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">
                                            +{course.price} €
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        )}
                    </Card>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
