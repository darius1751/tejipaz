import { cloudinary } from "../config/cloudinary.config"

export const uploadImage = async (path: string, to: string) => {
    try {
        const uploadImageData = await cloudinary.uploader.upload(path, {
            unique_filename: true,
            overwrite: true,
            folder: to,
            type:'asset'
        })
        return uploadImageData.secure_url;
    } catch (error) {
        console.error({ error })
    }
}