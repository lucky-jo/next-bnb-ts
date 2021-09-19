import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import IncomingForm from 'formidable/Formidable'
import aws from 'aws-sdk'
import { createReadStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const form: IncomingForm = new formidable.IncomingForm()
      const url = await new Promise((resolve, reject) => {
        // 타입 수정
        form.parse(req, async (err: Error, fields, files: any) => {
          const s3 = new aws.S3({
            accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESSKEY_ID,
          })

          const stream = createReadStream(files.file.path)

          // 파일이름
          const originalFileName = files.file.name!.split('.').shift()
          // 확장자
          const fileExtension = files.file.name!.split('.').pop()

          await s3
            .upload({
              Bucket: `${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}`,
              Key: `${originalFileName}__${uuidv4()}.${fileExtension}`,
              ACL: 'public-read',
              Body: stream,
            })
            .promise()
            .then((res) => resolve(res.Location))
            .catch((e) => reject(e))
        })
      })
      res.statusCode = 201
      res.send(url)
    } catch (e) {
      console.log(e)
      res.end()
    }
  }
  res.statusCode = 405

  return res.end()
}
