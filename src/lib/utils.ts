export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};

  if (cookieString) {
    const itemString = cookieString.split(/\s*;\s*/);
    itemString.forEach((items) => {
      const item = items.split(/\s*=\s*/);
      cookies[item[0]] = item.splice(1).join("=");
    });
  }
  return cookies;
};
