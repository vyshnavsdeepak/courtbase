import slugify from "slugify";

export const slugifyCourtComplex = (courtComplex: string, district: string) => {
  return slugify([courtComplex, district].join("-"), {
    replacement: "-",
    remove: /[*+~.()'"!:@,]/g,
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });
};

export const slugifyCourtName = (
  courtName: string,
  nationalCourtCode: string,
) => {
  return slugify([courtName, nationalCourtCode].join("-"), {
    replacement: "-",
    remove: /[*+~.()'"!:@,]/g,
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });
};

export const slugifyCaseType = (
  caseTypeId: string,
  caseTypeName: string,
  complexId: string,
): string => {
  const caseTypeLabelCode = caseTypeName.split("-")[0];
  if (!caseTypeLabelCode) {
    throw new Error("Invalid case type name");
  }
  return slugify(`${caseTypeLabelCode.trim()}-${caseTypeId}-est-${complexId}`, {
    lower: true,
  });
};
