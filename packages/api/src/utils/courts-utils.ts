import slugify from "slugify";

export const slugifyCourtName = (courtName: string) => {
  return slugify(courtName, {
    replacement: "-",
    remove: /[*+~.()'"!:@,]/g,
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });
};
