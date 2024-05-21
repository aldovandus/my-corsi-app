import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { getInitials } from "@/lib/utils";
import React from "react";
import AddSubscription from "../AddSubscription/AddSubcription";
import { Label } from "@/Components/ui/label";

type Props = {};

function CustomerSubscriptions({ subscriptions }: Props) {
    return (
        <div className="py-3">
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
                                    {/*  {getInitials(
                                        subscription.code,
                                        subscription.c
                                    )} */}
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
                                    <Label className="font-bold">
                                        Pagato:{" "}
                                    </Label>
                                    {subscription.price / 2} €
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

export default CustomerSubscriptions;
