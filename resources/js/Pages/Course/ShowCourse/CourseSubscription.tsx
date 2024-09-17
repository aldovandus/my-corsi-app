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

const CourseSubscription = ({
    subscription,
}: {
    subscription: CustomerWithSubscription;
}) => {
    return (
        <Card>
            <CardHeader className="flex">
                <div className="flex gap-4 items-center">
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
