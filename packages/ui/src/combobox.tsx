"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@court-base/ui";
import { Button } from "@court-base/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@court-base/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@court-base/ui/popover";

interface ComboboxProps {
  items: { value: string; label: string }[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
  allowDeselect?: boolean;
}
export const Combobox: React.FC<ComboboxProps> = ({
  items,
  placeholder = "Select an item...",
  onSelect,
  disabled = false,
  allowDeselect = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<string | number>(
    "auto",
  );

  React.useEffect(() => {
    if (buttonRef.current) {
      setPopoverWidth(buttonRef.current.offsetWidth);
    }
  }, [buttonRef.current?.offsetWidth]);

  const handleSelect = (currentValue: string) => {
    let newValue;
    if (allowDeselect) {
      newValue = currentValue === value ? "" : currentValue;
    } else {
      newValue = currentValue;
    }
    setValue(newValue);
    setOpen(false);
    if (onSelect) {
      onSelect(newValue);
    }
  };

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: popoverWidth }}
        className="p-0"
        portal={false}
      >
        <Command>
          <CommandInput
            placeholder="Search..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
