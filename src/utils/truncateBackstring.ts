export const truncateBackstring = (originalString: string) =>
  originalString.replace(/[\w.-]+@[\w.-]+\.\w{2,4}\n?\(끝\)?/g, "").trim();
