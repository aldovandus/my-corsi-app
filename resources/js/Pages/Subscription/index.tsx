import { Badge } from "@/Components/ui/badge";
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
} from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Subscription } from "@/types";

function index({
    auth,
    subscription,
}: PageProps<{ subscription: Subscription }>) {
    return (
        <Authenticated user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    index {JSON.stringify(subscription)}
                    <Card x-chunk="dashboard-05-chunk-3">
                        <CardHeader className="px-7">
                            <CardTitle>Iscrizione</CardTitle>
                            <CardDescription>
                                Lista delle rate pagate per l'iscrizione.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Metodo di pagamento
                                        </TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Status
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Date
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Amount
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {subscription.payments?.map((payment) => (
                                        <TableRow>
                                            <TableCell>{payment.id}</TableCell>
                                            <TableCell>
                                                {payment.method}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-accent">
                                        <TableCell>
                                            <div className="font-medium">
                                                Liam Johnson
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                liam@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge
                                                className="text-xs"
                                                variant="secondary"
                                            >
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-23
                                        </TableCell>
                                        <TableCell className="text-right">
                                            $250.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Olivia Smith
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                olivia@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Refund
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge
                                                className="text-xs"
                                                variant="outline"
                                            >
                                                Declined
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-24
                                        </TableCell>
                                        <TableCell className="text-right">
                                            $150.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Noah Williams
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                noah@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Subscription
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge
                                                className="text-xs"
                                                variant="secondary"
                                            >
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-25
                                        </TableCell>
                                        <TableCell className="text-right">
                                            $350.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Emma Brown
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                emma@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge
                                                className="text-xs"
                                                variant="secondary"
                                            >
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-26
                                        </TableCell>
                                        <TableCell className="text-right">
                                            $450.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Liam Johnson
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                liam@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge
                                                className="text-xs"
                                                variant="secondary"
                                            >
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-23
                                        </TableCell>
                                        <TableCell className="text-right">
                                            $250.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Liam Johnson
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                liam@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge
                                                className="text-xs"
                                                variant="secondary"
                                            >
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-23
                                        </TableCell>
                                        <TableCell className="text-right">
                                            $250.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Olivia Smith
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                olivia@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Refund
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge
                                                className="text-xs"
                                                variant="outline"
                                            >
                                                Declined
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-24
                                        </TableCell>
                                        <TableCell className="text-right">
                                            $150.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Emma Brown
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                emma@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge
                                                className="text-xs"
                                                variant="secondary"
                                            >
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-26
                                        </TableCell>
                                        <TableCell className="text-right">
                                            $450.00
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Authenticated>
    );
}

export default index;
