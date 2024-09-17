import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import DatePicker from "@/Components/ui/date-picker";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/Components/ui/select";
import { Payment } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

type Props = Partial<Payment> & { subscription_id: number };

function NewRataModal({ subscription_id }: Props) {
    const { post, errors, setData, reset, clearErrors } = useForm<Props>({
        subscription_id,
    });

    const [selectedFruit, setSelectedFruit] = useState("");
    const [date, setDate] = useState<Date>();
    // const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const onClick = () => {
        //setShow(true);
    };
    const onClose = () => {
        // setShow(false);
        reset();
        clearErrors();
    };

    return (
        <div className="relative">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    aria-hidden="true"
                />
            )}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="h-5" /> Nuova Rata
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[655px] z-50">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Aggiungi una nuova rata!
                        </DialogTitle>
                        <DialogDescription>
                            Choose your favorite fruit from the dropdown below.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-3">
                        {Object.keys(errors)
                            .slice(0, 3)
                            .map((key) => (
                                <div className="text-red-500">
                                    {errors[key]}
                                </div>
                            ))}

                        <div className="grid  items-center gap-4">
                            <div>
                                <DatePicker
                                    className="w-full"
                                    defaultDate={new Date()}
                                    onChange={(data) => {
                                        setData("payment_date", data);
                                    }}
                                />
                            </div>
                            <div>
                                <Input
                                    minLength={1}
                                    maxLength={50}
                                    type="number"
                                    onChange={(e) => {
                                        setData("number", e.target.value);
                                    }}
                                    placeholder="Numero rata"
                                />
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Numero ricevuta"
                                    onChange={(e) => {
                                        setData(
                                            "invoice_number",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Select
                                    onValueChange={(value) => {
                                        setData("method", value);
                                    }}
                                >
                                    <SelectTrigger
                                        onSelect={(e) => {
                                            e.preventDefault();
                                        }}
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Seleziona metodo di pagamento" />
                                    </SelectTrigger>
                                    <SelectContent
                                        onSelect={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <SelectGroup>
                                            <SelectItem value="contanti">
                                                Contanti
                                            </SelectItem>
                                            <SelectItem value="carta_di_credito">
                                                Carta di credito
                                            </SelectItem>
                                            <SelectItem value="bonifico">
                                                Bonifico
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Input
                                    type="text"
                                    placeholder="Importo"
                                    onChange={(e) =>
                                        setData(
                                            "amount",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                post(route("payment.store"), {
                                    onSuccess: () => {
                                        setIsOpen(false);
                                        reset();
                                    },
                                    /*   onError: (err) => {
                            if (err.overamount) alert(err.overamount);
                        }, */
                                });
                            }}
                            type="submit"
                            className="w-full"
                            size="lg"
                        >
                            Aggiungi Rata
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default NewRataModal;
