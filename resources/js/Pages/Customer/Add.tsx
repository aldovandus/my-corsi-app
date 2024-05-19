import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

const Edit = ({ auth, customer, subscriptions }) => {
    const { data, setData, post, processing, errors, patch, progress } =
        useForm({
            ...customer,
        });

    function submit(e: { preventDefault: () => void }) {
        e.preventDefault();
        post(route("customer.store"), {
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
                            <div className="flex flex-col gap-3">
                                <Input
                                    type="text"
                                    value={data.firstname}
                                    onChange={(e) =>
                                        setData("firstname", e.target.value)
                                    }
                                    placeholder="Email"
                                />

                                {/*  {errors.email && <div>{errors.email}</div>} */}
                                <Input
                                    type="text"
                                    value={data.lastname}
                                    onChange={(e) =>
                                        setData("lastname", e.target.value)
                                    }
                                    placeholder="Lastname"
                                />
                                {errors.lastname && (
                                    <div>{errors.lastname}</div>
                                )}
                                {/* <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />{" "}
                            Remember Me */}

                                <Button type="submit" disabled={processing}>
                                    Aggiungi
                                </Button>
                            </div>
                        </form>

                        <div>{JSON.stringify(subscriptions)}</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
