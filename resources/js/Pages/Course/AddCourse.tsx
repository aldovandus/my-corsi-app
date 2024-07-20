import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Course, PageProps } from "@/types";
import DatePicker from "@/Components/ui/date-picker";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { ArrowLeftIcon } from "lucide-react";
import FormErrors from "@/Components/FormErrors";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

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
                    Corsi
                </h2>
            }
        >
            <form onSubmit={submit}>
                <div>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="flex gap-2">
                            <Link href={route("course.index")}>
                                <div className="flex gap-2 items-center py-4 cursor-pointer">
                                    <ArrowLeftIcon className="h-5 w-5" />
                                    <Label className="text-2xl cursor-pointer">
                                        Corsi
                                    </Label>
                                </div>
                            </Link>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button
                                    onClick={() => {
                                        window.history.back();
                                    }}
                                    variant="outline"
                                    size="sm"
                                >
                                    Annulla
                                </Button>

                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={processing}
                                >
                                    Salva Corso
                                </Button>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Nuovo Corso</CardTitle>
                                    <FormErrors errors={errors} />
                                </CardHeader>

                                <CardContent>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-2">
                                            <div className="w-full">
                                                <Label>Codice</Label>
                                                <Input
                                                    type="text"
                                                    value={data.code}
                                                    onChange={(e) =>
                                                        setData(
                                                            "code",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Codice"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <Label>Titolo</Label>

                                                <Input
                                                    type="text"
                                                    value={data.title}
                                                    onChange={(e) =>
                                                        setData(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Titolo"
                                                />
                                            </div>
                                        </div>

                                        <Label htmlFor="email">Prezzo</Label>
                                        <Input
                                            type="text"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            placeholder="Prezzo"
                                        />

                                        <div className="flex gap-2">
                                            <div className="w-full">
                                                <div>
                                                    <Label>
                                                        Data inizio corso
                                                    </Label>

                                                    <DatePicker
                                                        className="w-full"
                                                        onChange={(date) => {
                                                            setData(
                                                                "startDate",
                                                                date
                                                            );
                                                        }}
                                                        label="Inizio Corso"
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full">
                                                <Label htmlFor="email">
                                                    Data fine corso
                                                </Label>
                                                <DatePicker
                                                    className="w-full"
                                                    onChange={(date) => {
                                                        setData(
                                                            "endDate",
                                                            date
                                                        );
                                                    }}
                                                    label="Fine Corso"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <div className="w-full">
                                                <Label>Data inizio stage</Label>

                                                <DatePicker
                                                    className="w-full"
                                                    onChange={(date) => {
                                                        setData(
                                                            "startStage",
                                                            date
                                                        );
                                                    }}
                                                    label="Inizio Stage"
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label>Data inizio 10%</Label>

                                                <DatePicker
                                                    className="w-full"
                                                    onChange={(date) => {
                                                        setData(
                                                            "endDate10",
                                                            date
                                                        );
                                                    }}
                                                    label="Inizio 10%"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="w-full">
                                                <Label>Data esame</Label>

                                                <DatePicker
                                                    className="w-full"
                                                    onChange={(date) => {
                                                        setData(
                                                            "examDate",
                                                            date
                                                        );
                                                    }}
                                                    label="Data esame"
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label>Luogo Stage</Label>
                                                <Input
                                                    type="text"
                                                    value={data.stageLocation}
                                                    onChange={(e) =>
                                                        setData(
                                                            "stageLocation",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Luogo stage"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-full">
                                                <Label>Ora Inizio</Label>

                                                <Input
                                                    type="text"
                                                    value={data.startTime}
                                                    onChange={(e) =>
                                                        setData(
                                                            "startTime",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Esempio: 8:30"
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label>Ora Fine</Label>
                                                <Input
                                                    type="text"
                                                    value={data.endTime}
                                                    onChange={(e) =>
                                                        setData(
                                                            "endTime",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Esempio: 13:00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Note Extra</CardTitle>
                                    </CardHeader>
                                    <CardContent>
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
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
};

export default Add;
