import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/Components/ui/card";
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
    TableFooter,
} from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Payment, SubscriptionWithCustomerAndCourse } from "@/types";
import { format, sub } from "date-fns";
import { it } from "date-fns/locale";
import NewRataModal from "./NewRataModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
import { Switch } from "@/Components/ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";
import formatDate from "@/lib/hooks/formatDate";
import { getPaymentsMethodMap } from "@/lib/payments-method-map";
import CustomerCard from "@/Components/customer/CustomerCard";
import CourseCard from "@/Components/course/CourseCard";
import { Badge } from "@/Components/ui/badge";

function index({
    auth,
    subscription,
    payments,
    totalPayments,
}: PageProps<{
    subscription: SubscriptionWithCustomerAndCourse & {
        subscriptionPrice: string;
    };
    payments: Payment[];
    totalPayments: number;
}>) {
    return (
        <Authenticated
            breadcrumbRoutes={[{ label: "Clienti", url: "customer.index" }, { label: `${subscription.firstname.toLowerCase()} ${subscription.lastname.toLowerCase()}`, url: "customer.show", urlParams: { id: subscription.customer_id ?? 3515 } }, { label: `Iscrizione ${subscription.code}` }]}
            user={auth.user}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-2">
                        {/*  <Card>
                            <CardHeader>
                                <CardTitle>Cliente</CardTitle>
                                <div>
                                    {subscription.firstname}{" "}
                                    {subscription.lastname}
                                </div>
                                <div>{subscription.cf}</div>
                            </CardHeader>
                        </Card> */}

                        <CustomerCard customer={subscription} />
                        <CourseCard course={subscription} />

                        {/*  <Card>
                            <CardHeader>
                                <CardTitle>Corso</CardTitle>
                                <CardDescription>
                                    <div className="text-xl">
                                        {subscription?.code} -
                                        {subscription?.title}
                                    </div>
                                    <div>
                                        <span className="font-bold">
                                            Prezzo:{" "}
                                        </span>
                                        {subscription?.subscriptionPrice}€
                                    </div>
                                    <div>
                                        <span className="font-bold">
                                            Data iscrizione:{" "}
                                        </span>
                                        {formatDate(
                                            subscription.subscription_date
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Label>Esito Esame</Label>
                                        <Switch
                                            
                                            checked={subscription.exam_result}
                                        />
                                    </div>
                                </CardDescription>
                            </CardHeader>
                        </Card> */}
                    </div>

                    <Card x-chunk="dashboard-05-chunk-3" className="mt-5">
                        <CardHeader className="px-7">
                            <div className="flex items-center justify-between">
                                <CardTitle>Iscrizione</CardTitle>
                                <NewRataModal
                                    subscription_id={subscription.id}
                                />
                            </div>
                            <CardDescription>
                                Lista delle rate pagate per l'iscrizione.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Numero</TableHead>
                                        <TableHead>Numero ricevuta</TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Metodo di pagamento
                                        </TableHead>

                                        <TableHead className="hidden md:table-cell">
                                            Data
                                        </TableHead>
                                        <TableHead>Importo</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments?.map((payment, index: number) => (
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                {payment.invoice_number}
                                            </TableCell>
                                            <TableCell>
                                                <Badge> {
                                                    getPaymentsMethodMap[
                                                    payment.method
                                                    ]
                                                }</Badge>
                                            </TableCell>

                                            <TableCell>
                                                {format(
                                                    payment.payment_date,
                                                    "PPP",
                                                    { locale: it }
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {payment.amount} €
                                            </TableCell>

                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <span className="sr-only">
                                                                apri menu
                                                            </span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuLabel>
                                                            Azioni
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem>
                                                            Modifica
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                if (
                                                                    confirm(
                                                                        "Sei sicuro di voler eliminare la rata?"
                                                                    )
                                                                ) {
                                                                    router.delete(
                                                                        route(
                                                                            "payment.destroy",
                                                                            {
                                                                                id: payment.id,
                                                                            }
                                                                        )
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            Elimina
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell
                                            className="text-lg"
                                            colSpan={3}
                                        >
                                            Totale
                                        </TableCell>
                                        <TableCell />
                                        <TableCell className="text-lg">
                                            {totalPayments} €
                                        </TableCell>
                                        <TableCell />
                                    </TableRow>
                                    <TableRow className="bg-white">
                                        <TableCell
                                            className="text-md"
                                            colSpan={3}
                                        >
                                            Da Saldare
                                        </TableCell>
                                        <TableCell />
                                        <TableCell className="text-md">
                                            {parseFloat(
                                                subscription.subscriptionPrice
                                            ) - totalPayments}
                                            €
                                        </TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Authenticated>
    );
}

export default index;
