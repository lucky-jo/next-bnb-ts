import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.statusCode = 400;
        return res.send("필수 데이터가 없습니다.");
      }
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      return res.send(error);
    }
    return res.end();
  }
  res.statusCode = 405;
  return res.end();
};
