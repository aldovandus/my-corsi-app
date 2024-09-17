import { AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Avatar } from "@/Components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { CustomerWithSubscription } from "@/types";
import { Separator } from "@/Components/ui/separator";
import { Badge } from "@/Components/ui/badge";
import { router, useForm } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";

const CourseSubscription = ({
    subscription,
}: {
    subscription: CustomerWithSubscription;
}) => {
    const { delete: destroy } = useForm();
    return (
        <Card>
            <CardHeader className="flex">
                <div className="flex gap-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="hidden h-14 w-14 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>
                                {getInitials(
                                    subscription.firstname,
                                    subscription.lastname
                                )}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-md">
                                {subscription.firstname} {subscription.lastname}
                            </CardTitle>
                            <div className="text-sm">{subscription.email}</div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Azioni</DropdownMenuLabel>

                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    router.get(
                                        route("customer.show", {
                                            id: subscription.customer_id,
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
                <div className="pt-3">
                    <Separator />
                </div>
            </CardHeader>

            <CardContent>
                {/* <div>
                    <span>Prezzo: </span>
                    <span className="font-bold">{subscription.price} €</span>
                </div> */}
                <Badge>{subscription.price} €</Badge>
            </CardContent>
            <CardFooter>
                <div className="text-sm">
                    Iscritto il {subscription.subscription_date ?? "10/10/2015"}
                </div>
            </CardFooter>
        </Card>
    );
};

export default CourseSubscription;
