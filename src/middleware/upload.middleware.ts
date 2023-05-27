import AWS from 'aws-sdk';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { config } from "dotenv";
import multer from 'multer';

config();
const storage = multer.memoryStorage();
const upload = multer({ storage });

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

interface IParams {
    Bucket: string,
    Key: string,
    Body: Buffer,
    ContentDisposition?: string;
    ContentType?: string;
}

const uploadToS3 = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.files) {
            req.body.fileLocations = [];
            return next();
        }
        const filesArray = Array.from(req.files as Express.Multer.File[]);
        const fileLocations: string[] = [];
        await Promise.all(
            filesArray.map(async (file) => {
                console.log(file)
                let params: IParams = {
                    Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
                    Key: `${uuidv4()}-${file.originalname}`,
                    Body: file.buffer,
                };
                if (file.mimetype.includes('pdf')) {
                    params = {
                        ...params,
                        ContentDisposition: "inline",
                        ContentType: "application/pdf",
                    }
                }
                console.log("params", params);
                const data = await s3.upload(params).promise();
                fileLocations.push(data.Location);
            })
        )
        req.body.fileLocations = fileLocations;
        next();
    } catch (error) {
        console.log('error', error.message)
        error.statusCode = 400;
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

export { uploadToS3, upload }