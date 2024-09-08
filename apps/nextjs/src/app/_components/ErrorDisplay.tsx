import React from "react";

interface ErrorObject {
  message?: string;
}

interface Errors {
  [key: string]: ErrorObject | Errors; // Allows nested errors
}

interface Props {
  errors: Errors;
}

const ErrorDisplay: React.FC<Props> = ({ errors }) => {
  // Recursive function to display nested errors
  const renderErrors = (errorObj: Errors | ErrorObject, parentKey = "") => {
    return Object.entries(errorObj).map((entry) => {
      const key = entry[0];
      const error = entry[1] as ErrorObject | Error;
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if ("message" in error && error.message) {
        return (
          <div key={fullKey}>
            <span>{error.message}</span>
          </div>
        );
      } else if (typeof error === "object") {
        return (
          <div key={fullKey}>{renderErrors(error as Errors, fullKey)}</div>
        );
      }

      return (
        <div key={fullKey}>
          <span>Unknown error</span>
        </div>
      );
    });
  };

  return (
    <div>
      {Object.keys(errors).length > 0 && (
        <div className="text-destructive">{renderErrors(errors)}</div>
      )}
    </div>
  );
};

export default ErrorDisplay;
