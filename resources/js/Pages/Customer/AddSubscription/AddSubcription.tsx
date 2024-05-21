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

const AddSubscription = () => {
    const { post } = useForm();

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
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Prezzo
                        </Label>
                        <Input
                            id="username"
                            defaultValue=""
                            className="col-span-3"
                            placeholder="Es: 1000 €"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Data
                        </Label>
                        <DatePicker />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSave} type="submit">
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
