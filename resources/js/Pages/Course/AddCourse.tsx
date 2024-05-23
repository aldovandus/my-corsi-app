import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Course, PageProps } from "@/types";
import DatePicker from "@/Components/ui/date-picker";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

const Add = ({ auth }: PageProps) => {
    const { data, setData, post, processing, errors } = useForm<Course>();

    function submit(e: { preventDefault: () => void }) {
        e.preventDefault();
        post(route("course.store"), {
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
                    Nuovo corso
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-14">
                        <form onSubmit={submit}>
                            <div className="flex flex-col gap-3">
                                {errors.code && <div>{errors.code}</div>}

                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">Codice</Label>
                                    <Input
                                        type="text"
                                        value={data.code}
                                        onChange={(e) =>
                                            setData("code", e.target.value)
                                        }
                                        placeholder="Codice"
                                    />
                                </div>

                                {errors.title && <div>{errors.title}</div>}

                                <Label htmlFor="email">Titolo</Label>

                                <Input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder="Titolo"
                                />

                                {errors.price && <div>{errors.price}</div>}
                                <Label htmlFor="email">Prezzo</Label>
                                <Input
                                    type="text"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    placeholder="Prezzo"
                                />

                                <Label htmlFor="email">Data inizio corso</Label>

                                <div className="flex gap-4">
                                    <DatePicker
                                        onChange={(date) => {
                                            setData("startDate", date);
                                        }}
                                        label="Inizio Corso"
                                    />
                                    <DatePicker
                                        onChange={(date) => {
                                            setData("endDate", date);
                                        }}
                                        label="Fine Corso"
                                    />
                                </div>

                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="message">Extra</Label>
                                    <Textarea
                                        onChange={(e) => {
                                            setData("extra", e.target.value);
                                        }}
                                        placeholder="Se vuoi scrivi qualche info qui."
                                        id="message"
                                    />
                                </div>

                                <Button type="submit" disabled={processing}>
                                    Aggiungi
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Add;