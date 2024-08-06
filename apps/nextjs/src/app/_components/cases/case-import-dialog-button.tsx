"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@court-base/ui/dialog";
import { Button } from "@court-base/ui/button";
import React, { useState } from "react";
import { Combobox } from "@court-base/ui/combobox";
import { api } from "~/trpc/react";

const lawyersData = [
    {
        value: "Deepak Madathil",
        label: "Deepak Madathil"
    },
];

export default function CaseImportDialogButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">🪄 Import Cases (No magic!)</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
            <CaseImportDialog />
            </DialogContent>
        </Dialog>
    );
}

function CaseImportDialog() {
    const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null);
    const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | null>(null);

    const { data: statesSource, isLoading: statesLoading } = api.court.states.useQuery();
    const states = statesLoading ? [{name: "Loading...", stateCode: ""}] : (statesSource ?? [{name: "No states found", stateCode: ""}]);


    const { data: districtsSource, isLoading: districtsLoading } =api.court.districts.useQuery({
        stateCode: selectedStateCode ?? ''
    }, {
        enabled: !!selectedStateCode
    });
    const districts = districtsLoading ? [{name: "Loading...", districtCode: ""}] : (districtsSource ?? [{name: "No districts found", districtCode: ""}]);

    const { data: courtComplexesSource, isLoading: courtsLoading }=api.court.getCourtComplexes.useQuery({
        stateCode: selectedStateCode ?? '',
        districtCode: selectedDistrictCode ?? ''
    }, {
        enabled: !!selectedStateCode && !!selectedDistrictCode
    });

    const courtComplexes = courtsLoading ? [{name: "Loading...", id: ""}] : (courtComplexesSource ?? [{ name: "No courts found", id: "" }]);

    return (          <>      <DialogHeader>
        <DialogTitle>Import cases from courts</DialogTitle>
        <DialogDescription>Select one or more courts you want to import cases from.</DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
            <Combobox placeholder="Select a lawyer" items={lawyersData} onSelect={() => {}} />
            <Combobox
                placeholder="Select State"
                items={states.map(state => ({ value: state.stateCode, label: state.name }))}
                onSelect={(value) => setSelectedStateCode(value)}
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <Combobox
                placeholder="Select District"
                items={
                    districts.map(district => ({ value: district.districtCode, label: district.name }))

                }
                onSelect={(value) => setSelectedDistrictCode(value)}
                disabled={!selectedStateCode}
            />
            <Combobox
                placeholder="Select Court"
                items={courtComplexes.map(court => ({ value: court.id, label: court.name }))}
                disabled={!selectedDistrictCode}
            />
        </div>
        <Button type="submit">Import</Button>
    </div></>)
}