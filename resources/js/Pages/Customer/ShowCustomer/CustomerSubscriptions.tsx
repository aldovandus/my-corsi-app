import NavLink from "@/Components/NavLink";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Label } from "@/Components/ui/label";
import { Subscription } from "@/types";
import { useForm } from "@inertiajs/react";
import { MoreHorizontal, Trash } from "lucide-react";
import React from "react";

type Props = {
    subscriptions: Subscription[];
    addSubscription?: React.ReactNode;
};

function CustomerSubscriptions({ subscriptions, addSubscription }: Props) {
    const { delete: destroy } = useForm();
    return (
        <div className="py-3">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Iscrizioni</CardTitle>
                        {addSubscription}
                    </div>
                    <CardDescription className="text-md">
                        {subscriptions.length === 0
                            ? "Nessuna iscrizione"
                            : "Gestisci le iscrizioni del cliente"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8">
                    {subscriptions.map((subscription) => (
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage
                                    src="/avatars/01.png"
                                    alt="Avatar"
                                />
                                <AvatarFallback>
                                    {subscription.code}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {subscription.code}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {subscription.title}
                                </p>
                            </div>
                            <div className="ml-auto font-medium flex gap-3 items-center">
                                <div className="text-red-600">
                                    <Label className="font-bold">
                                        Da pagare:{" "}
                                    </Label>
                                    {subscription.price} €
                                </div>
                                <div className="text-green-800">
                                    {" "}
                                    <Label className="font-bold">Pagato:</Label>
                                    {parseFloat(subscription.price) / 2} €
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
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
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Azioni
                                    </DropdownMenuLabel>

                                    <DropdownMenuItem>
                                        <NavLink
                                            href={route("subscription.show", {
                                                id: subscription.id,
                                            })}
                                            active={route().current(
                                                "subscription.show",
                                                {
                                                    id: subscription.id,
                                                }
                                            )}
                                        >
                                            <span>Vedi</span>
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    "Sei sicuro di voler eliminare l'iscrizione?"
                                                )
                                            ) {
                                                destroy(
                                                    route(
                                                        "subscription.destroy",
                                                        {
                                                            id: subscription.id,
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
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

export default CustomerSubscriptions;
