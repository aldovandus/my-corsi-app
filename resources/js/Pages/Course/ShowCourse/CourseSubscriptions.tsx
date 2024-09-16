import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/Components/ui/card";
import { getInitials } from "@/lib/utils";
import { Subscription } from "@/types";
import CourseSubscription from "./CourseSubscription";

function CourseSubscriptions({
    subscriptions,
}: {
    subscriptions: Subscription[];
}) {
    return (
        <div className="py-4">
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                    <CardTitle>Iscrizioni</CardTitle>
                    {subscriptions.length === 0 ? (
                        <CardDescription>
                            Nessun iscritto al corso.
                        </CardDescription>
                    ) : (
                        <CardDescription>Lista degli iscritti.</CardDescription>
                    )}
                </CardHeader>

                <CardContent className="grid grid-cols-3 gap-4">
                    {subscriptions.map((subscription) => (
                        <CourseSubscription subscription={subscription} />
                        /*  <div className="flex items-center gap-4">
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
                                    {subscription.firstname}{" "}
                                    {subscription.lastname}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {subscription.email}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">
                                {subscription.price} €
                            </div>
                        </div> */
                    ))}

                    {/*   <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/02.png" alt="Avatar" />
                            <AvatarFallback>JL</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                Jackson Lee
                            </p>
                            <p className="text-sm text-muted-foreground">
                                jackson.lee@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$39.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/03.png" alt="Avatar" />
                            <AvatarFallback>IN</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                Isabella Nguyen
                            </p>
                            <p className="text-sm text-muted-foreground">
                                isabella.nguyen@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$299.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/04.png" alt="Avatar" />
                            <AvatarFallback>WK</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                William Kim
                            </p>
                            <p className="text-sm text-muted-foreground">
                                will@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$99.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/05.png" alt="Avatar" />
                            <AvatarFallback>SD</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                Sofia Davis
                            </p>
                            <p className="text-sm text-muted-foreground">
                                sofia.davis@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$39.00</div>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    );
}

export default CourseSubscriptions;
