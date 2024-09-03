import slugify from "slugify";

export const generateMemberId = (name: string) => {
  return slugify(name, { lower: true, strict: true, trim: true });
};
