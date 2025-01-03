import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export const uploadCloudinary = async (path: string, publicId: string) => {
  const result = await cloudinary.uploader.upload(
    path,
    {
      resource_type: "auto",
      folder: "game_images",
      public_id: publicId,
    },
    async (error, result) => {
      if (error) {
        throw new Error("Error uploading image");
      }

      await unlink(path);
    }
  );
  return result;
};

export const deleteFile = async (imageName: string) => {
  const publicId = imageName.substring(0, imageName.lastIndexOf("."));

  const result = await cloudinary.uploader.destroy("game_images/" + publicId);
  return result;
};
