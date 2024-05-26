import { Button } from "@/Components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { Copy, Truck, MoreVertical } from "lucide-react";

type Props = {};

function CustomerDetails({}: Props) {
    return (
        <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Order Oe31b70H
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy Order ID</span>
                            </Button>
                        </CardTitle>
                        <CardDescription>
                            Date: November 23, 2023
                        </CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1"
                        >
                            <Truck className="h-3.5 w-3.5" />
                            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                Track Order
                            </span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                >
                                    <MoreVertical className="h-3.5 w-3.5" />
                                    <span className="sr-only">More</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Export</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Trash</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">Order Details</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Glimmer Lamps x <span>2</span>
                                </span>
                                <span>$250.00</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Aqua Filters x <span>1</span>
                                </span>
                                <span>$49.00</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default CustomerDetails;
