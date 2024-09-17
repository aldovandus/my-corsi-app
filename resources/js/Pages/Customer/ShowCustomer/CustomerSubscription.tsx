import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
import { Subscription } from "@/types";
import formatDate from "@/lib/hooks/formatDate";

type Props = {
    subscription: Subscription;
    destroy(url: string, options?: any): void;
};

function CustomerSubscription({ subscription, destroy }: Props) {
    const progressValue =
        parseFloat(subscription.price) > 0
            ? (parseFloat(subscription.total ? subscription.total : "0") /
                  parseFloat(subscription?.price)) *
              100
            : 0;

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle className="text-2xl">
                        Codice {subscription.code}
                    </CardTitle>
                    <CardDescription>
                        Iscrizione al corso{" "}
                        <span className="font-bold">{subscription.title}</span>
                    </CardDescription>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">apri menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Azioni</DropdownMenuLabel>

                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    router.get(
                                        route("subscription.show", {
                                            id: subscription.id,
                                        })
                                    );
                                }}
                            >
                                Vedi
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    if (
                                        confirm(
                                            "Sei sicuro di voler eliminare l'iscrizione?"
                                        )
                                    ) {
                                        destroy(
                                            route("subscription.destroy", {
                                                id: subscription.id,
                                            })
                                        );
                                    }
                                }}
                            >
                                Elimina
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent>
                <div className="text-sm">
                    <span className="font-bold">Data iscrizione: </span>
                    <span className="">
                        {formatDate(new Date(subscription.subscription_date))}
                    </span>
                </div>

                <div className="text-sm">
                    <span className="font-bold">Esito esame: </span>
                    <span className="">
                        {subscription.exam_result
                            ? "esame svolto"
                            : "esame non svolto"}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col justify-start items-start">
                <div className="text-lg">
                    {subscription.total ?? 0}/
                    <span className="font-bold">{subscription.price} €</span>
                </div>
                <Progress value={progressValue} aria-label="25% increase" />
            </CardFooter>
        </Card>
    );
}

export default CustomerSubscription;
