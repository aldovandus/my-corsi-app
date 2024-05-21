import { Button } from "@/Components/ui/button";
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogClose,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import {
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Plus, Save, X } from "lucide-react";
import DatePicker from "@/Components/ui/date-picker";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const AddSubscription = ({ customer }) => {
    const { data, setData, post, processing } = useForm({
        course_id: 2,
        customer_id: customer.id,
    });
    const onSave = () => {
        post(route("subscription.store"));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="h-5 w-5" /> Nuova iscrizione
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nuova Iscrizione</DialogTitle>
                    <DialogDescription>
                        Aggiungi tutti i dati per l'iscrizione al corso. Quando
                        hai finito clicca su aggiungi.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Corso
                        </Label>
                        <Input
                            id="name"
                            placeholder="Nome Corso"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Prezzo
                        </Label>
                        <Input
                            id="price"
                            defaultValue={data.price}
                            className="col-span-3"
                            placeholder="Es: 1000 €"
                            onChange={(e) => {
                                setData("price", e.target.value);
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Data
                        </Label>
                        <DatePicker
                            onChange={(date) => {
                                setData("subscription_date", date);
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        disabled={processing}
                        onClick={onSave}
                        type="submit"
                    >
                        <Save className="w-4 h-4 mr-2" /> Salva
                    </Button>
                    <DialogClose asChild>
                        <Button type="submit" variant="destructive">
                            <X className="w-4 h-4 mr-2" /> Cancella
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddSubscription;
