'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React from 'react';
const PageLoadProgress = (props: { children: React.ReactNode }) => {

  return (
    <>
      {props.children}
      <ProgressBar
        height="4px"
        color="#007BFF"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};

export default PageLoadProgress;