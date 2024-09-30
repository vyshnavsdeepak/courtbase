import React, { useRef, useState } from "react";

import { Combobox } from "@court-base/ui/combobox";
import { Input } from "@court-base/ui/input";

interface CaseNumberInputProps {
  caseTypeOptions: { value: string; label: string }[];
  onChange: (value: {
    typeName: string;
    number: string;
    regYear: string;
  }) => void;
  disabled?: boolean;
}

const CaseNumberInput = ({
  caseTypeOptions,
  disabled,
  onChange,
}: CaseNumberInputProps) => {
  const [typeName, setTypeName] = useState("");
  const [number, setNumber] = useState("");
  const [regYear, setRegYear] = useState("");

  const regYearRef = useRef<HTMLInputElement>(null);

  const handleCaseTypeChange = (value: string) => {
    setTypeName(value);
    onChange({ typeName: value, number, regYear });
  };

  const handleCaseRegNoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRegNo = event.target.value;
    if (newRegNo.includes("/")) {
      const split = newRegNo.split("/");
      console.log("split", split);
      if (split.length === 2 && split[0] && split[1]) {
        setNumber(split[0]);
        setRegYear(split[1]);
        onChange({ typeName, number: split[0], regYear: split[1] });
      }
      regYearRef.current?.focus();
      return;
    }
    setNumber(newRegNo);
    onChange({ typeName, number: newRegNo, regYear });
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = event.target.value;
    setRegYear(newYear);
    onChange({ typeName, number, regYear: newYear });
  };

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-sm text-muted-foreground">Case Number</label>
      <div className="flex items-center space-x-2">
        <div className="w-3/6 overflow-hidden">
          <Combobox
            placeholder="Type"
            items={caseTypeOptions}
            onSelect={handleCaseTypeChange}
            disabled={disabled}
          />
        </div>
        <span>/</span>

        <Input
          type="text"
          value={number}
          onChange={handleCaseRegNoChange}
          placeholder="Reg No"
          className="w-2/6 p-2"
          disabled={disabled}
        />
        <span>/</span>

        <Input
          type="text"
          value={regYear}
          onChange={handleYearChange}
          placeholder="Year"
          className="w-1/6 p-2"
          disabled={disabled}
          ref={regYearRef}
        />
      </div>
    </div>
  );
};

CaseNumberInput.displayName = "CaseNumberInput";

export default CaseNumberInput;
