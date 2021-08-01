import axios from "./index";

// 회원가입
export const signUpAPI = async (body: SignUpAPIBody): Promise<boolean> => {
  try {
    const result = await axios.post("/api/auth/signup", body);
    return true;
  } catch (err) {
    return false;
  }
};
