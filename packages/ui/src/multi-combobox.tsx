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
  onSelect?: (values: string[]) => void;
  disabled?: boolean;
}

export const MultiCombobox: React.FC<ComboboxProps> = ({
  items,
  placeholder = "Select items...",
  onSelect,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
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
    const newValues = selectedValues.includes(currentValue)
      ? selectedValues.filter((value) => value !== currentValue) // deselect
      : [...selectedValues, currentValue];

    setSelectedValues(newValues);

    if (newValues.length === items.length) {
      setOpen(false);
    }
    if (onSelect) {
      onSelect(newValues);
    }
  };
  const countSelected = selectedValues.length;
  const selectedLabels =
    countSelected > 1
      ? `${countSelected} selected`
      : countSelected === 1
        ? items.find((item) => item.value === selectedValues[0])?.label
        : placeholder;

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
          {selectedValues.length > 0 ? selectedLabels : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: popoverWidth }}
        className="p-0"
        portal={false}
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(item.value)
                        ? "opacity-100"
                        : "opacity-0",
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
