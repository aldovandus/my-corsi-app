import { Button } from "@/Components/ui/button";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Course, PageProps, CustomerWithSubscription } from "@/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Edit } from "lucide-react";
import CourseSubscriptions from "./CourseSubscriptions";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import formatDate from "@/lib/hooks/formatDate";

function ShowCourse({
    auth,
    course,
    subscriptions,
}: PageProps<{ course: Course, subscriptions: { data: CustomerWithSubscription[] } }>) {
    return (
        <Authenticated breadcrumbRoutes={[{ label: "Corsi", url: "course.index" }, { label: "Corso " + course.code }]}
            user={auth.user} >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Corso</CardTitle>
                                <CardDescription>
                                    Informazioni sul corso {course.code}.
                                </CardDescription>
                            </div>

                            <Button
                                size="sm"
                                className="bg-green-600 ml-auto gap-1"
                            >
                                <>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Modifica
                                </>
                            </Button>
                        </CardHeader>

                        <CardContent className="flex justify-between">
                            <div className=" text-gray-900">
                                <div className="flex gap-3">
                                    <Label>Codice:</Label>
                                    <span>{course.code}</span>
                                </div>
                                <div className="flex gap-3">
                                    <Label>Nome corso:</Label>
                                    <span>{course.title.toUpperCase()}</span>
                                </div>
                                <div className="flex gap-3">
                                    <Label>Prezzo:</Label>
                                    <span className="font-bold">
                                        {course.price} €
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Label>Data inizio:</Label>
                                    <span className="font-bold">
                                        {formatDate(course.startDate)}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Label>Data Fine:</Label>
                                    <span className="font-bold">
                                        {formatDate(course.endDate)}
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <Label>Extra:</Label>
                                    <span className="font-bold">
                                        {course.extra}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <CourseSubscriptions subscriptions={subscriptions.data} />
                </div>
            </div>
        </Authenticated >
    );
}

export default ShowCourse;
