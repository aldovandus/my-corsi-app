import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { useEffect, useState } from "react";
import { Course } from "@/types";

const getData = async () => {
    try {
        const data = await fetch("/api/courses");
        return await data.json();
    } catch (error) {
        throw error;
    }
};

export default function CoursesComboBox({
    setData,
}: {
    setData(_: string, value: any): void;
}) {
    const [open, setOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Course>();

    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        getData().then((data) => setCourses(data));
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between capitalize"
                >
                    {/*   {currentCourse
                        ? courses.find(
                              (course) =>
                                  course.title.toLowerCase() ===
                                  currentCourse.title?.toLowerCase()
                          )?.title
                        : "Seleziona un corso..."} */}
                    {currentCourse
                        ? `${currentCourse?.code}-${currentCourse?.title}`
                        : "Seleziona un corso..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput placeholder="Cerca Corso..." />
                    <CommandEmpty>Nessun corso trovato.</CommandEmpty>
                    <CommandGroup className="capitalize">
                        {courses.map((course) => (
                            <CommandItem
                                key={course.code}
                                value={`${course.code} ${course.title}`}
                                onSelect={(selectedCourse) => {
                                    setCurrentCourse(
                                        selectedCourse ===
                                            `${course.code} ${course.title}`
                                            ? course
                                            : currentCourse
                                    );

                                    setData("course_id", course?.id);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        currentCourse?.title === course.title
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {course.code} - {course.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
