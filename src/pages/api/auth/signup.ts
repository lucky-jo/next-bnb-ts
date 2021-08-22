import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { getList, existEmail, resister } from "../../../lib/data/user";
import jwt from "jsonwebtoken";

const Container = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, firstname, lastname, password, birthday } = req.body;
      if (!email || !firstname || !lastname || !password || !birthday) {
        res.statusCode = 400;
        return res.send("필수 데이터가 없습니다.");
      }
      console.log("email", email, firstname, lastname, password, birthday);
      const hashedPassword = bcrypt.hashSync(password, 8);
      const users = getList();
      const result = existEmail(email, users);
      if (result) throw new Error("이미 가입한 이메일 입니다.");
      const userId = String((users.length | 0) + 1);
      const newUser: StoredUser = {
        id: userId,
        email,
        firstname,
        lastname,
        password: hashedPassword,
        birthday,
      };
      await resister([...users, newUser]);
      const token = jwt.sign(
        String(newUser.id),
        process.env.NEXT_PUBLIC_JWT_SECRET!
      );
      console.log("token: " + token);
      res.setHeader("Set-Cookie", `access_token=${token}; path=/; Httponly`);
      // res.setHeader(
      //   "Set-Cookie",
      //   `access_token=${token}; path=/; Expires=${new Date(
      //     Date.now() + 60 * 60 * 24 * 1000 * 3
      //   )}; Httponly`
      // );

      return res.end();
    } catch (e) {
      return res.end(e.message);
    }
  }
  res.statusCode = 405;
  return res.end();
};

//* 회원가입 api 순서
// api method POST 확인
// req.body 정합성 확인
// email 중복 확인
// password 암호화
// resister userInfo
// send resistered userInfo & token

export default Container;
