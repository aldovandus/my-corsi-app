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
import { Customer, CustomerWithSubscription, Subscription } from "@/types";
import CoursesComboBox from "./CoursesComboBox";

interface Props {
    customer_id: CustomerWithSubscription["customer_id"];
    price?: CustomerWithSubscription["price"];
    subscription_date?: Date;
}

const AddSubscription = ({ customer }: { customer: Customer }) => {
    const { data, setData, post, processing, errors, reset } = useForm<Props>({
        customer_id: customer.id,
    });

    const onSave = () => {
        post(route("subscription.store"), {
            onSuccess: () => {
                document.getElementById("closeDialog")?.click();
                reset();
            },
            onError: (err) => {
                if (err.course_id) {
                    alert(err.course_id);
                }
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <Plus className="h-5 w-5" /> Nuova iscrizione
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[495px]">
                <DialogHeader>
                    <DialogTitle>Nuova Iscrizione</DialogTitle>
                    <DialogDescription>
                        Aggiungi tutti i dati per l'iscrizione al corso. Quando
                        hai finito clicca su aggiungi.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Corso</Label>

                        <CoursesComboBox setData={setData} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Prezzo</Label>
                        <Input
                            id="price"
                            color="red"
                            type="number"
                            defaultValue={data.price}
                            className="col-span-3"
                            style={{
                                border: errors.price ? "1px solid red" : "none",
                            }}
                            placeholder="Es: 1000 €"
                            onChange={(e) => {
                                setData("price", e.target.value);
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Data</Label>
                        <DatePicker
                            defaultDate={new Date()}
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
