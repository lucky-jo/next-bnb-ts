import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const aceessToken = req.headers.cookie;
      if (!aceessToken) {
        req.statusCode = 400;
        return res.send("access_token이 없습니다.");
      }
      const userId = jwt.verify(aceessToken, process.env.JWT_USER!);
      console.log(userId);
      return res.end();
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
    res.statusCode = 405;
    return res.end();
  }
};
