export const uniqueNameGen = (originalname: string): string => {
  const trimImage = originalname.replace(/[^a-zA-Z0-9_.-]/g, "");

  const filename = Date.now() + "_" + trimImage;
  return filename;
};
