import { Customer } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import formatDate from '@/lib/hooks/formatDate';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreVertical } from 'lucide-react';
import { ReactNode } from 'react';
import { Badge } from '../ui/badge';
import { Link } from '@inertiajs/react';

interface Props {
    customer: Customer & { customer_id: number };
    actions?: ReactNode
}

const CustomerCard = ({ customer, actions }: Props) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-start">
                <div>
                    <CardTitle>Cliente</CardTitle>
                    <CardDescription>
                        Dati del cliente
                    </CardDescription>
                </div>
                {actions && <div className="ml-auto flex items-center gap-1">
                    {actions}
                </div>}
            </CardHeader>


            <CardContent>

                <div className='font-bold'>
                    {customer.cf}
                </div>
                <div>
                    <Link href={route('customer.show', { id: customer.customer_id ?? customer.id })}>
                        {customer.firstname} {customer.lastname}
                    </Link>
                </div>
                {customer.email && <Badge>{customer.email}</Badge>}
                {/*  <Badge>
                    {customer.birth_date &&
                        formatDate(customer.birth_date, <span className="ml-2">Data errata</span>)}
                </Badge> */}



            </CardContent>

        </Card>
    );
};

export default CustomerCard;
