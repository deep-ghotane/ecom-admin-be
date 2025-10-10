import slugify from "slugify";

export const slugifyItem = (name) => {
  return slugify(name);
};
