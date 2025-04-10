export const getAccessToken = (): string | undefined => {
  const access = localStorage.getItem('access');
  if (access) {
    return JSON.parse(access);
  }
  return undefined;
};
