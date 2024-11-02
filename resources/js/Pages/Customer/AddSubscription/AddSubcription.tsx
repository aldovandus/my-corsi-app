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
                        Aggiungi tutti i dati per l'iscrizione al corso.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col  gap-4 py-4">
                    <div className="flex items-center gap-4">
                        {/* <Label className="text-right">Corso</Label> */}

                        <CoursesComboBox setData={setData} />
                    </div>
                    <div className="flex items-center gap-4">
                        {/* <Label className="text-right">Prezzo</Label> */}
                        <Input
                            id="price"
                            color="red"
                            type="number"
                            defaultValue={data.price}
                            className="col-span-3"
                            style={{
                                border: errors.price ? "1px solid red" : "",
                            }}

                            placeholder="Inserisci prezzo del corso"
                            onChange={(e) => {
                                setData("price", e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        {/* <Label className="text-sm">Data</Label> */}
                        <DatePicker
                            className="w-full"
                            //defaultDate={new Date()}
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
