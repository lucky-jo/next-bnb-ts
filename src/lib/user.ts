import { readFileSync, writeFileSync } from "fs";

// 전체 유저 조회
const getList = (): StoredUser[] => {
  const userBuffer = readFileSync("src/data/user.json");
  const userString = userBuffer.toString();
  if (!userString) {
    return [];
  } else {
    const users: StoredUser[] = JSON.parse(userString);
    return users;
  }
};
// email 중복 확인
const existEmail = (email: string, users: StoredUser[]): boolean => {
  return users.some((user: StoredUser) => user.email === email);
};

// 유저 리스트 저장
const resister = async (users: StoredUser[]): Promise<boolean> => {
  try {
    writeFileSync("src/data/user.json", JSON.stringify(users));
    return true;
  } catch (_) {
    return false;
  }
};

// email 로 유저 조회
const find = ({ email }: { email: string }): StoredUser | undefined => {
  return getList().find((user) => user.email === email);
};

export { getList, existEmail, resister, find };
