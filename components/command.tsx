"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@nextui-org/theme";
import { Modal, ModalContent } from "@nextui-org/modal";
import { Kbd } from "@nextui-org/kbd";

const Command = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
    <CommandPrimitive
        ref={ref}
        className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-md",
            className,
        )}
        {...props}
    />
));

Command.displayName = CommandPrimitive.displayName;

const CommandDialog: React.FC<
    React.PropsWithChildren<React.ComponentPropsWithoutRef<typeof Modal>>
> = ({ children, ...props }) => {
    return (
        <Modal {...props}>
            <ModalContent className="overflow-hidden p-0 shadow-lg">
                <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-default-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                    {children}
                </Command>
            </ModalContent>
        </Modal>
    );
};

const CommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
    <div className="flex items-center border-b border-foreground-400 px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandPrimitive.Input
            ref={ref}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            className={cn(
                "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            {...props}
        />
    </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.List
        ref={ref}
        className={cn(
            "max-h-[300px] overflow-y-auto overflow-x-hidden",
            className,
        )}
        {...props}
    />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Empty>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
    <CommandPrimitive.Empty
        ref={ref}
        className="py-6 text-center text-sm"
        {...props}
    />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
        ref={ref}
        className={cn(
            "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-default-500",
            className,
        )}
        {...props}
    />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandItem = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm text-foreground/70 outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-content2 data-[selected=true]:text-content1-foreground data-[disabled=true]:opacity-50",
            className,
        )}
        {...props}
    />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <Kbd className={cn("ml-auto text-xs", className)} {...props}>
            {children}
        </Kbd>
    );
};

CommandShortcut.displayName = "CommandShortcut";

const CommandSeparator = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 h-px bg-divider", className)}
        {...props}
    />
));

CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
