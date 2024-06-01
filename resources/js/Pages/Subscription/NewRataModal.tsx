import { Plus } from "lucide-react";
import React, { useState } from "react";
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
    SelectLabel,
    SelectItem,
} from "@/Components/ui/select";
import { Payment } from "@/types";

type Props = Partial<Payment> & { subscription_id: number };

function NewRataModal({ subscription_id }: Props) {
    const { post, hasErrors, errors, setData } = useForm<Props>({
        subscription_id,
    });
    const [show, setShow] = useState(false);

    const onClick = () => {
        setShow(true);
    };
    const onClose = () => {
        setShow(false);
    };

    return (
        <div>
            <Modal closeable={true} show={show} onClose={onClose}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        //setShow(false);
                        post(route("payment.store"));
                    }}
                    className="p-6"
                >
                    <h2 className="text-lg font-medium text-gray-900">
                        Aggiungi una nuova rata! {hasErrors.toString()}
                    </h2>

                    <div className="flex flex-col gap-3 mt-6">
                        {errors.method && (
                            <div className="text-red-500">{errors.method}</div>
                        )}
                        {/*   <div>
                            <Input
                                minLength={1}
                                maxLength={50}
                                type="number"
                                placeholder="Numero rata"
                            />
                        </div> */}
                        <div>
                            {/*   <Input
                                type="text"
                                placeholder="Metodo di pagamento"
                            /> */}

                            <Select
                                onValueChange={(value) => {
                                    setData("method", value);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleziona metodo di pagamento" />
                                </SelectTrigger>
                                <SelectContent>
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
                            <DatePicker
                                className="w-full"
                                onChange={(data) => {
                                    setData("payment_date", data);
                                }}
                            />
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

                        <div className="flex w-full">
                            <Button type="submit" className="w-full" size="lg">
                                Aggiungi Rata
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
            <Button onClick={onClick}>
                <Plus className="h-5" /> Nuova Rata
            </Button>
        </div>
    );
}

export default NewRataModal;
