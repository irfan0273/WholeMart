import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const uploadImageClodinary = async (image) => {
    const buffer = image?.buffer;
    if (!buffer) throw new Error("Image buffer missing");

    return await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "Wholemart" },
            (error, uploadResult) => {
                if (error) {
                    console.error("Cloudinary Error:", error);
                    return reject(error);
                }
                if (!uploadResult?.url) {
                    return reject(new Error("Upload failed: No URL returned"));
                }
                resolve(uploadResult);
            }
        ).end(buffer);
    });
};

export default uploadImageClodinary;
