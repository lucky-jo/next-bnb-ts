import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import IncomingForm from "formidable/Formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const form: IncomingForm = new formidable.IncomingForm();
      form.parse(req, async (err: Error, fields, files) => {
        console.log("files", files);
        res.statusCode = 204;
        return res.end();
      });
    } catch (error) {
      console.log(error.message);
      return res.end();
    }
  }
  res.statusCode = 405;
  return res.end();
};
