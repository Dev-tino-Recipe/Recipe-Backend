
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from'aws-sdk';
import dotenv from 'dotenv';
import * as path from "node:path";
dotenv.config();

// AWS S3 설정
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Multer S3 설정
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        // acl: 'public-read',   // 파일 접근 권한 설정 (공용 읽기 권한)
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // 파일의 s3 내 경로 및 이름 설정
            cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
        }
    })
});

// 한 장 업로드
export const upload_single = (name) => {
    upload.single(name);
}