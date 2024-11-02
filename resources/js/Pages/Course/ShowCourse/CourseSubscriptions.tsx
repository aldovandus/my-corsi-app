import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/Components/ui/card";
import { CustomerWithSubscription, Subscription } from "@/types";
import CourseSubscription from "./CourseSubscription";

function CourseSubscriptions({
    subscriptions,
}: {
    subscriptions: CustomerWithSubscription[];
}) {
    return (
        <div className="py-4">
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                    <CardTitle>Iscrizioni</CardTitle>
                    {subscriptions?.length === 0 ? (
                        <CardDescription>
                            Nessun iscritto al corso.
                        </CardDescription>
                    ) : (
                        <CardDescription>Lista degli iscritti.</CardDescription>
                    )}
                </CardHeader>

                <CardContent className="grid grid-cols-3 gap-4">
                    {subscriptions?.map((subscription) => (
                        <CourseSubscription subscription={subscription} />

                    ))}


                </CardContent>
            </Card>
        </div>
    );
}

export default CourseSubscriptions;
