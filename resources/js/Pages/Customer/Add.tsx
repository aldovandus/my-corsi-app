import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import DatePicker from "@/Components/ui/date-picker";
import { Customer, PageProps, Subscription } from "@/types";
import { Textarea } from "@/Components/ui/textarea";

const AddCustomer = ({ auth, customer }: PageProps<{ customer: Customer }>) => {
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
                    Clienti
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Nuovo Cliente</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={submit}>
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-6">
                                        <div className="grid w-full items-center gap-1.5">
                                            <Label>Nome</Label>
                                            <Input
                                                type="text"
                                                value={data.firstname}
                                                onChange={(e) =>
                                                    setData(
                                                        "firstname",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nome"
                                            />
                                        </div>

                                        {/*  {errors.email && <div>{errors.email}</div>} */}

                                        <div className="grid w-full items-center gap-1.5">
                                            <Label>Cognome</Label>
                                            <Input
                                                type="text"
                                                value={data.lastname}
                                                onChange={(e) =>
                                                    setData(
                                                        "lastname",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Cognome"
                                            />
                                        </div>

                                        {errors.lastname && (
                                            <div>{errors.lastname}</div>
                                        )}
                                    </div>

                                    <div className="flex gap-6">
                                        <div className="grid w-full items-center gap-1.5">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                type="text"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Email"
                                            />
                                        </div>

                                        <div className="grid w-full items-center gap-1.5">
                                            <Label htmlFor="phone">
                                                Telefono
                                            </Label>

                                            <Input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Telefono"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Codice Fiscale</Label>
                                        <Input
                                            type="text"
                                            value={data.cf}
                                            onChange={(e) =>
                                                setData("cf", e.target.value)
                                            }
                                            placeholder="Codice fiscale"
                                        />
                                    </div>

                                    <div className="flex gap-3 w-full">
                                        <div className="grid w-full items-center gap-1.5">
                                            <Label>Data di nascita</Label>

                                            <DatePicker
                                                onChange={(date) => {
                                                    setData("birth_date", date);
                                                }}
                                                label="Data di nascita"
                                            />
                                        </div>

                                        <div className="grid w-full items-center gap-1.5">
                                            <Label>Luogo di Nascita</Label>

                                            <Input
                                                type="text"
                                                value={data.birth_place}
                                                onChange={(e) =>
                                                    setData(
                                                        "birth_place",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Scrivi la città di nascita"
                                            />
                                        </div>

                                        <div className="grid w-full items-center gap-1.5">
                                            <Label>Cap</Label>

                                            <Input
                                                type="text"
                                                value={data.cap}
                                                onChange={(e) =>
                                                    setData(
                                                        "cap",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Numero di cap"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="message">Extra</Label>
                                        <Textarea
                                            onChange={(e) => {
                                                setData(
                                                    "extra",
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="Se vuoi scrivi qualche info qui."
                                            id="message"
                                        />
                                    </div>

                                    <div>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Salva
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AddCustomer;
