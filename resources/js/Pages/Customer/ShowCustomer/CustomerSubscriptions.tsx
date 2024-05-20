import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { getInitials } from "@/lib/utils";
import React from "react";
import AddSubscription from "../AddSubscription/AddSubcription";

type Props = {};

function CustomerSubscriptions({ subscriptions }: Props) {
    return (
        <div className="py-12">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Iscrizioni</CardTitle>
                        <AddSubscription />
                    </div>
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
                                    {getInitials(
                                        subscription.firstname,
                                        subscription.lastname
                                    )}
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
                            <div className="ml-auto font-medium">
                                {subscription.price} €
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

export default CustomerSubscriptions;
