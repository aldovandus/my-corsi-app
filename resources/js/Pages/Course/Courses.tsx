import { DataTable } from "@/Components/DataTable";
import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import clsx from "clsx";

const columns: ColumnDef<any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "code",
        header: "Codice",
        cell: ({ row }) => (
            <div className="capitalize font-bold">{row.getValue("code")}</div>
        ),
    },
    {
        accessorKey: "title",
        header: "Titolo",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: "Prezzo",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("price")}</div>
        ),
    },
    {
        accessorKey: "startDate",
        header: "Data Inizio",
        cell: ({ row }) => (
            <div className="capitalize">
                {format(row.getValue("startDate"), "PPP", { locale: it })}
            </div>
        ),
    },

    {
        accessorKey: "endDate",
        header: "Data Fine",
        cell: ({ row }) => (
            <div className="capitalize">
                {format(row.getValue("endDate"), "PPP", { locale: it })}
            </div>
        ),
    },

    {
        id: "actions",
        header: "Azioni",
        enableHiding: false,
        cell: ({ row }) => {
            const { delete: destroy, processing } = useForm();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Azioni</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                if (
                                    confirm(
                                        "Sei sicuro di voler eliminare il Corso?"
                                    )
                                ) {
                                    destroy(
                                        route("course.destroy", {
                                            id: row.getValue("id"),
                                        })
                                    );
                                }
                            }}
                        >
                            Elimina
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <NavLink
                                href={route("course.show", {
                                    id: row.getValue("id"),
                                })}
                                active={route().current("course.show", {
                                    id: row.getValue("id"),
                                })}
                            >
                                Vedi Corso
                            </NavLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const Courses = ({ auth, courses }: PageProps) => {
    const { flash } = usePage<any>().props;

    console.log({ usePageProps: usePage().props });

    const flashClass = clsx("p-3 rounded-md text-white", {
        ["bg-green-600"]: flash.message?.type === "success",
        ["bg-red-600"]: flash.message?.type === "danger",
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Corsi
                </h2>
            }
        >
            <div className="py-12">
                {/*   {flash.error && (
                    <div className="alert alert-danger">{flash.error}</div>
                )} */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {flash.message && (
                                <div className={flashClass}>
                                    {flash.message?.content}
                                </div>
                            )}
                            <DataTable
                                data={courses}
                                columns={columns}
                                newBtn={
                                    <NavLink
                                        href={route("course.add")}
                                        active={false}
                                    >
                                        <Button>Nuovo Corso</Button>
                                    </NavLink>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Courses;
