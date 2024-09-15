import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import NavLink from "@/Components/NavLink";

import { usePage, useForm } from "@inertiajs/react";
import clsx from "clsx";
import { Customer, PageProps } from "@/types";

export const columns: ColumnDef<any>[] = [
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
        accessorKey: "cf",
        header: "Codice Fiscale",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("cf")}</div>
        ),
    },
    {
        accessorKey: "firstname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nome
                    {/*  <ArrowUpDown className="ml-2 h-4 w-4" /> */}
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("firstname")}</div>
        ),
    },
    {
        accessorKey: "lastname",
        header: () => <div className="">Cognome</div>,
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("lastname")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: () => <div className="">Email</div>,
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "phone",
        header: () => <div className="">Telefono</div>,
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("phone")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const { delete: destroy } = useForm();

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

                        <DropdownMenuItem>
                            <NavLink
                                href={route("customer.show", {
                                    id: row.getValue("id"),
                                })}
                                active={route().current("customer.show", {
                                    id: row.getValue("id"),
                                })}
                            >
                                <span>Vedi</span>
                            </NavLink>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <NavLink
                                href={route("customer.edit", {
                                    id: row.getValue("id"),
                                })}
                                active={route().current("customer.edit", {
                                    id: row.getValue("id"),
                                })}
                            >
                                <span>Modifica</span>
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                if (
                                    confirm(
                                        "Sei sicuro di voler eliminare il cliente?"
                                    )
                                ) {
                                    destroy(
                                        route("customer.destroy", {
                                            id: row.getValue("id"),
                                        })
                                    );
                                }
                            }}
                        >
                            Elimina
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const Customers = ({
    auth,
    customers,
    filter,
}: PageProps<{ customers: Customer[]; filter: string }>) => {
    const { flash } = usePage<any>().props;

    const flashClass = clsx("p-3 rounded-md text-white", {
        ["bg-green-600"]: flash.message?.type === "success",
        ["bg-red-600"]: flash.message?.type === "danger",
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Clienti
                </h2>
            }
            breadcrumbRoutes={[{ label: "Clienti", url: "customer.index" }]}
        >
            <div className="">
                <div className=" mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {flash.message && (
                                <div className={flashClass}>
                                    {flash.message?.content}
                                </div>
                            )}
                            <DataTable
                                filter={filter}
                                data={customers}
                                columns={columns}
                                columnVisibility={{ id: false }}
                                newBtn={
                                    <NavLink
                                        href={route("customer.add")}
                                        active={false}
                                    >
                                        <Button size="sm">Nuovo Cliente</Button>
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

export default Customers;
