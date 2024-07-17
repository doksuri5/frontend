export const filterMainPath = (pathname: string) => {
  return /^(\/|\/ko|\/en|\/fr|\/ch|\/jp)$/.test(pathname);
};
