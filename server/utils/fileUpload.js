import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

let s3 = null;
const initializeS3FS = () => {
    const s3Options = {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        signatureVersion: 'v4'
    }

    s3 = new AWS.S3(s3Options);
}

const uploadFile = (filePath, folderPath) => {
    var uploadParams = { Bucket: process.env.S3_BUCKET_PATH, Key: '', Body: '' };
    var fileStream = fs.createReadStream(filePath);
    fileStream.on('error', function (err) {
        throw err
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = folderPath ? folderPath + "/" + path.basename(filePath) : path.basename(filePath).substring(1);
    // call S3 to retrieve upload file to specified bucket
    return new Promise((resolve, reject) => {
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                reject(err)
            } if (data) {
                fs.unlinkSync(filePath, (err) => {
                    if (err) reject(err);
                })
                resolve(data.Location);
            }
        });
    })

}

export default uploadFile;
export {
    initializeS3FS
}