export const exclude = <
  Doc extends Record<string, unknown>,
  Key extends keyof Doc,
>(
  doc: Doc,
  keysToExclude: Key[],
) => {
  return Object.fromEntries(
    Object.entries(doc).filter(([key]) => !keysToExclude.includes(key as Key)),
  ) as Omit<Doc, Key>;
};
