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

// string 에서  number 만 return 하는 함수
export const getNumber = (str: string) => {
  const numbers = str.match(/\d/g)?.join("");
  return numbers ? Number(numbers) : null;
};

// 금액을 입력하면 금액에 ,를 넣어주는 함수
export const makeMoneyString = (input: string) => {
  const amountString = input.replace(/[^0-9]/g, "");
  if (amountString) {
    return parseInt(amountString, 10).toLocaleString();
  }
  return "";
};

// query string 만들기
export const makeQueryString = (
  baseUrl: string,
  queriesObject: Object & { [key: string]: any }
) => {
  const keys = Object.keys(queriesObject);
  const values = Object.values(queriesObject);
  if (keys.length === 0) {
    return baseUrl;
  }
  let queryString = `${baseUrl}?`;
  keys.forEach((key, i) => {
    if (queriesObject[key]) {
      queryString += `${keys[i]}=${values[i]}&`;
    }
  });
  // 마지막 '&' 제거하기
  return queryString.slice(0, -1);
};
