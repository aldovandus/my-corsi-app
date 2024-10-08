import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

import { it } from "date-fns/locale";
import { useEffect, useState } from "react";

const DatePicker = ({
    label = "Scegli una data",
    onChange,
    defaultDate,
    className,
}: {
    label?: string;
    onChange?(date: Date): void;
    defaultDate?: Date;
    className?: string;
}) => {
    const [date, setDate] = useState<Date | null>();

    useEffect(() => {
        if (defaultDate) {
            setDate(defaultDate);
            if (onChange) onChange(defaultDate);
        }
    }, []);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                        format(date, "PPP", { locale: it })
                    ) : (
                        <span>{label}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date as Date}
                    onSelect={(e) => {
                        setDate(e);
                        if (onChange) onChange(e as Date);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
