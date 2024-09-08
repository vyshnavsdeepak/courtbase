"use client";

import React from "react";

import { api } from "~/trpc/react";

export const ManualCaseImportJobs = () => {
  const { data, error } = api.caseImport.importJobsByCaseNumber.useQuery();

  return (
    <div>
      <h1>Manual Case Import Jobs</h1>
      <div>
        {data?.map((job) => (
          <div key={job.id}>
            <div>Case Type: {job.caseType}</div>
            <div>
              Case Number: {job.number}/{job.regYear}
            </div>
            <div>Response: {JSON.stringify(job.response)}</div>
            <div>Created By: {job.createdBy}</div>
            <div>Created At: {job.createdAt.toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div>{error && <div>Error: {error.message}</div>}</div>
    </div>
  );
};
