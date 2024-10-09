import { useEffect, useState } from "react";

import { Combobox } from "@court-base/ui/combobox";

interface CourtComplex {
  courts: {
    id: string;
    name: string;
    complexId: string;
  }[];
  id: string;
  name: string;
  isMasterCourtComplex: boolean;
  masterComplexCourtCode: string | null;
}

interface DistrictCourt {
  courtId: string;
  complexId: string;
}

export default function DistrictCourtInput(props: {
  data: CourtComplex[];
  isLoading: boolean;
  disabled: boolean;
  onChange: (districtCourt: DistrictCourt) => void;
  selected?: DistrictCourt | null;
}) {
  const districtCourtsSource = props.data;
  const isLoading = props.isLoading;
  const selectedInput = props.selected;
  const transformDistrictCourts = () => {
    if (isLoading) {
      return [
        { value: "", label: "Loading...", isHeader: false, selectable: false },
      ];
    }
    if (districtCourtsSource.length === 0) {
      return [
        {
          value: "",
          label: "No courts found",
          isHeader: false,
          selectable: false,
        },
      ];
    }
    const items: {
      value: string;
      label: string;
      isHeader: boolean;
      selectable: boolean;
    }[] = [];

    districtCourtsSource.forEach((complex) => {
      // Add complex name as header
      const valueObj = { complexId: complex.id, courtId: "" };
      // complex Id is always need to get case types
      if (complex.isMasterCourtComplex) {
        if (complex.courts.length !== 1) {
          throw new Error(
            `Master court complex ${complex.name} should have exactly one court`,
          );
        }
        valueObj.courtId = complex.courts[0]?.id ?? "";
      }
      items.push({
        value: [valueObj.complexId, valueObj.courtId].join(":"),
        label: complex.name,
        isHeader: true,
        selectable: complex.isMasterCourtComplex,
      });

      // Add courts under the complex if it's not a master court complex
      if (!complex.isMasterCourtComplex) {
        complex.courts.forEach((court) => {
          items.push({
            value: [valueObj.complexId, court.id].join(":"),
            label: court.name,
            isHeader: false,
            selectable: true,
          });
        });
      }
    });
    return items;
  };

  const districtCourts = transformDistrictCourts();
  const [selectedDistrictCourt, setSelectedDistrictCourt] = useState("");

  useEffect(() => {
    if (selectedInput) {
      const { complexId, courtId } = selectedInput;
      setSelectedDistrictCourt([complexId, courtId].join(":"));
    }
  }, [selectedInput]);

  const handleChange = (val: string) => {
    setSelectedDistrictCourt(val);
    const [complexId, courtId] = val.split(":");
    if (!courtId || !complexId) {
      console.warn("Something went wrong in parsing district court id: ", val);
      return;
    }
    props.onChange({ complexId, courtId });
  };

  return (
    <Combobox
      placeholder="Select Court"
      items={districtCourts}
      selectedValue={selectedDistrictCourt}
      onSelect={handleChange}
      disabled={props.disabled}
    />
  );
}
