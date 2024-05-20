import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import AddSubscription from "./AddSubscription/AddSubcription";

const Edit = ({ auth, customer, subscriptions }) => {
    const { data, setData, post, processing, errors, patch, progress } =
        useForm({
            ...customer,
        });

    function submit(e: { preventDefault: () => void }) {
        e.preventDefault();
        patch(route("customer.update"), {
            onSuccess: () => {
                console.log("success...");
            },
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Customers
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-14">
                        <form onSubmit={submit}>
                            <div className="flex flex-col items-baseline gap-3">
                                <Input
                                    type="text"
                                    value={data.firstname}
                                    onChange={(e) =>
                                        setData("firstname", e.target.value)
                                    }
                                    placeholder="Nome"
                                />

                                {errors.firstname && (
                                    <div>{errors.firstname}</div>
                                )}
                                <Input
                                    type="text"
                                    value={data.lastname}
                                    onChange={(e) =>
                                        setData("lastname", e.target.value)
                                    }
                                    placeholder="Cognome"
                                />
                                {errors.lastname && (
                                    <div>{errors.lastname}</div>
                                )}

                                <Button type="submit" disabled={processing}>
                                    Salva
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-14">
                    <h1 className="text-2xl">Iscrizioni</h1>
                    <AddSubscription />
                    {subscriptions.length > 0 ? (
                        subscriptions.map((subscription) => (
                            <div>
                                {subscription.title} - {subscription.price} €
                            </div>
                        ))
                    ) : (
                        <div>Nessuna iscrizione</div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
