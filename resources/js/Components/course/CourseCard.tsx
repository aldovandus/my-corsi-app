import { Course, Customer, Subscription, SubscriptionWithCustomerAndCourse } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import formatDate from '@/lib/hooks/formatDate';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreVertical } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
    course: SubscriptionWithCustomerAndCourse;
    actions?: ReactNode
}

const CourseCard = ({ course, actions }: Props) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-start">
                <div>
                    <CardTitle>Corso</CardTitle>
                    <CardDescription>
                        Dati del corso
                    </CardDescription>
                </div>


                {actions && <div className="ml-auto flex items-center gap-1">
                    {actions}
                </div>}
            </CardHeader>


            <CardContent>


                <div className="text-xl">
                    {course?.code}-
                    {course?.title}
                </div>
                <div>
                    <span className="font-bold">
                        Prezzo:{" "}
                    </span>
                    {/*   {course?.subscriptionPrice}€ */}
                </div>
                <div>
                    <span className="font-bold">
                        Data iscrizione:{" "}
                    </span>
                    {formatDate(
                        course.subscription_date
                    )}
                </div>
                {/*  <div>
                    {customer.firstname} {customer.lastname}
                </div>
                <div>
                    {customer.birth_date &&
                        formatDate(customer.birth_date, <span className="ml-2">Data errata</span>)}
                </div>
 */}


            </CardContent>

        </Card>
    );
};

export default CourseCard;
