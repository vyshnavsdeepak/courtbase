import React, { useEffect, useRef, useState } from "react";

import { Combobox } from "@court-base/ui/combobox";
import { Input } from "@court-base/ui/input";

interface CaseNumberInputProps {
  caseTypeOptions: { value: string; label: string }[];
  selectedValue?: {
    caseTypeId: string;
    number: string;
    regYear: string;
  } | null;
  onChange: (value: {
    caseTypeId: string;
    number: string;
    regYear: string;
  }) => void;
  disabled?: boolean;
}

const CaseNumberInput = ({
  caseTypeOptions,
  selectedValue,
  disabled,
  onChange,
}: CaseNumberInputProps) => {
  const [caseTypeId, setCaseTypeId] = useState(selectedValue?.caseTypeId ?? "");
  const [number, setNumber] = useState(selectedValue?.number ?? "");
  const [regYear, setRegYear] = useState(selectedValue?.regYear ?? "");

  const regYearRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (selectedValue) {
      setCaseTypeId(selectedValue.caseTypeId);
      setNumber(selectedValue.number);
      setRegYear(selectedValue.regYear);
    }
  }, [selectedValue]);

  const handleCaseTypeChange = (value: string) => {
    setCaseTypeId(value);
    onChange({ caseTypeId: value, number, regYear });
  };

  const handleCaseRegNoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRegNo = event.target.value;
    if (newRegNo.includes("/")) {
      const split = newRegNo.split("/");
      if (split.length === 2 && split[0] && split[1]) {
        setNumber(split[0]);
        setRegYear(split[1]);
        onChange({
          caseTypeId: caseTypeId,
          number: split[0],
          regYear: split[1],
        });
      }
      regYearRef.current?.focus();
      return;
    }
    setNumber(newRegNo);
    onChange({ caseTypeId: caseTypeId, number: newRegNo, regYear });
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = event.target.value;
    setRegYear(newYear);
    onChange({ caseTypeId: caseTypeId, number, regYear: newYear });
  };

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-sm text-muted-foreground">Case Number</label>
      <div className="flex items-center space-x-2">
        <div className="w-3/6 overflow-hidden">
          <Combobox
            placeholder="Type"
            items={caseTypeOptions}
            selectedValue={caseTypeId}
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
