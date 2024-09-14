import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Link, router, usePage } from "@inertiajs/react";
import { ReactNode } from "react";

type Props = {
    label: string;
    isSelected: boolean;
    children: ReactNode;
    href: string;
};

function SidebarLink({ label, isSelected, children, href }: Props) {
    const linkClass = cn(
        "flex h-9 w-9 items-center  justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
        { "bg-primary text-white": isSelected }
    );

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={href} className={linkClass}>
                        {children}
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default SidebarLink;
