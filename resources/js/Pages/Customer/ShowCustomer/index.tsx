import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Customer, PageProps, Subscription } from "@/types";
import CustomerSubscriptions from "./CustomerSubscriptions";
import AddSubscription from "../AddSubscription/AddSubcription";
import CustomerDetails from "./CustomerDetails";

function index({
    auth,
    customer,
    subscriptions,
}: PageProps<{ customer: Customer & { customer_id: number }; subscriptions: Subscription[] }>) {
    return (
        <Authenticated
            breadcrumbRoutes={[{ label: "Clienti", url: "customer.index" }, { label: customer.cf }]}
            user={auth.user}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <CustomerDetails customer={customer} />

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
