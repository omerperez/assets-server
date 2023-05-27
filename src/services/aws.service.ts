import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";

interface UploadedFile {
    buffer: Buffer;
    originalname: string;
}

const uploadFile = async (dataBuffer: Buffer, filename: string): Promise<string> => {
    const s3 = new S3();
    const { AWS_PUBLIC_BUCKET_NAME } = process.env;

    const { Location: location } = await s3
        .upload({
            Bucket: AWS_PUBLIC_BUCKET_NAME as string,
            ContentDisposition: "inline",
            ContentType: "application/pdf",
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`,
        })
        .promise();
    return location;
}

const uploadSingleFile = async (
    s3: S3,
    dataBuffer: Buffer,
    filename: string
): Promise<string> => {
    const { AWS_PUBLIC_BUCKET_NAME } = process.env;

    const { Location: location } = await s3
        .upload({
            Bucket: AWS_PUBLIC_BUCKET_NAME as string,
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`,
        })
        .promise();
    return location;
}

const uploadMultipleFiles = async (files: UploadedFile[]) => {
    const s3 = new S3();
    const uploadFiles: string[] = [];
    await Promise.all(
        files.map(async (file) => {
            const currentUrl = await uploadSingleFile(
                s3,
                file.buffer,
                file.originalname
            );
            uploadFiles.push(currentUrl);
        })
    );
    return uploadFiles;
}

const awsService = {
    uploadFile, uploadMultipleFiles
}

export default awsService;