export const disableField = (
  field: string,
  image: string | null,
  category: string
): boolean => {
  if (!image) return true;
  if (category === "Umbrella" && ["amount", "uid"].includes(field)) return true;
  if (category === "Keys" && ["amount", "uid", "color"].includes(field))
    return true;
  return false;
};
