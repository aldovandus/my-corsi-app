import { DataTable, Payment } from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import NavLink from "@/Components/NavLink";

import { usePage, useForm } from "@inertiajs/react";

export const columns: ColumnDef<Payment>[] = [
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
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
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const { delete: destroy, processing } = useForm();

            const payment = row.original;

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
                                // navigator.clipboard.writeText(payment.id)\
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <NavLink
                                href={route("customer.edit", {
                                    id: row.getValue("id"),
                                })}
                                active={route().current("customer.edit", {
                                    id: row.getValue("id"),
                                })}
                            >
                                Vedi Cliente
                            </NavLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const Customers = ({ auth, customers }) => {
    const { flash } = usePage<any>().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Customers
                </h2>
            }
        >
            <div className="py-12">
                {flash.success && (
                    <div className="alert alert-success">{flash.success}</div>
                )}
                {flash.error && (
                    <div className="alert alert-danger">{flash.error}</div>
                )}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/*   {customers.map((customer) => (
                                <div>
                                    {customer.firstname} - {customer.lastname}
                                </div>
                            ))} */}

                            <DataTable data={customers} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Customers;
