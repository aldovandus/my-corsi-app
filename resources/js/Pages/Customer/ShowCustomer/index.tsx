import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Customer, PageProps, Subscription } from "@/types";
import CustomerSubscriptions from "./CustomerSubscriptions";
import AddSubscription from "../AddSubscription/AddSubcription";
import CustomerDetails from "./CustomerDetails";

function index({
    auth,
    customer,
    subscriptions,
}: PageProps<{ customer: Customer; subscriptions: Subscription[] }>) {
    return (
        <Authenticated user={auth.user}>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cliente</CardTitle>
                        </CardHeader>

                        <CustomerDetails />
                        {/* 
                        <CardContent className="flex justify-between">
                            <div className=" text-gray-900">
                                <div className="flex gap-3">
                                    <Label>Nome:</Label>
                                    <span>{customer.firstname}</span>
                                </div>
                                <div className="flex gap-3">
                                    <Label>Cognome:</Label>
                                    <span>{customer.lastname}</span>
                                </div>
                                <div className="flex gap-3">
                                    <Label>Codice Fiscale:</Label>
                                    <span className="font-bold">
                                        {customer.cf}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Label>Data inizio:</Label>
                                    <span className="font-bold">
                                        {customer.birth_date}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Label>Telefono/Cellulare:</Label>
                                    <span className="font-bold">
                                        {customer.phone}
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <Label>Extra:</Label>
                                    <span className="font-bold">
                                        {customer.extra}
                                    </span>
                                </div>
                            </div>
                        </CardContent> */}
                    </Card>

                    <CustomerSubscriptions
                        subscriptions={subscriptions}
                        addSubscription={
                            <AddSubscription customer={customer} />
                        }
                    />
                </div>
            </div>
        </Authenticated>
    );
}

export default index;
