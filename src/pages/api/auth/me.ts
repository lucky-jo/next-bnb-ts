import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import Data from "../../../lib/data";

const Controller = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.cookie;
      if (!accessToken) {
        res.statusCode = 400;
        return res.send("access_token이 없습니다.");
      }
      const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);

      const user = Data.user.findEmailOrId({ id: Number(userId) });
      if (!user) {
        res.statusCode = 404;
        return res.send("해당유저가 없습니다.");
      }

      const userWithoutPassword: Partial<Pick<StoredUser, "password">> = user;

      delete userWithoutPassword.password;
      res.statusCode = 200;
      return res.send(userWithoutPassword);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.send(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};

export default Controller;
