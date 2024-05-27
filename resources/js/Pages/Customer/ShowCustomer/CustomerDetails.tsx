import { Button } from "@/Components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Customer } from "@/types";
import { format } from "date-fns";
import { it } from "date-fns/locale";

import { Copy, Truck, MoreVertical } from "lucide-react";

type Props = {
    customer: Customer;
};

function CustomerDetails({ customer }: Props) {
    return (
        <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-xl">
                            {customer.firstname} {customer.lastname}
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy Order ID</span>
                            </Button>
                        </CardTitle>
                        <CardDescription>
                            <div className="font-bold">{customer.cf}</div>
                            Nato il :
                            {customer.birth_date &&
                                format(customer.birth_date, "PPP", {
                                    locale: it,
                                })}
                        </CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                >
                                    <MoreVertical className="h-3.5 w-3.5" />
                                    <span className="sr-only">More</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Modifica</DropdownMenuItem>
                                <DropdownMenuItem>Esporta</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Elimina</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">
                            Informazioni cliente
                        </div>
                        <dl className="grid gap-3">
                            <div className="flex items-center gap-1">
                                <dt className="font-bold">Email:</dt>
                                <dd>
                                    <a href="mailto:">{customer.email}</a>
                                </dd>
                            </div>
                            <div className="flex items-center gap-1">
                                <dt className="font-bold">Telefono:</dt>
                                <dd>
                                    <a href="tel:">{customer.phone}</a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className="grid gap-3 mt-3">
                        <div className="flex items-center gap-1">
                            <dt className="font-bold">Indirizzo:</dt>
                            <dd>
                                {customer.address} - {customer.cap}
                            </dd>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default CustomerDetails;
