import { cache } from "react";
import { Photo } from "@/types/types";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { ensureStringArray } from "./utils";

type PhotoDescriptions = {
  [fileName: string]: Photo;
};

const imageDirectory = path.join(process.cwd(), "public/images");

export const getPhotos = cache(async () => {
  const countryDirectories = fs
    .readdirSync(imageDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  let allPhotos: Photo[] = [];

  for (const country of countryDirectories) {
    const countryDirectory = path.join(imageDirectory, country);
    const jsonPath = path.join(countryDirectory, "index.json");

    if (fs.existsSync(jsonPath)) {
      const jsonText = fs.readFileSync(jsonPath, "utf-8");
      const descriptions = JSON.parse(jsonText) as PhotoDescriptions;

      const imageFiles = fs
        .readdirSync(countryDirectory)
        .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));

      const photos = imageFiles
        .map((file): Photo | null => {
          const photoData = descriptions[file];
          if (!photoData) return null;

          return {
            id: uuidv4(),
            path: `/images/${country}/${file}`,
            title: photoData.title,
            description: photoData.description,
            location: photoData.location,
            categories: ensureStringArray(photoData.categories),
          };
        })
        .filter((p): p is Photo => p !== null);

      allPhotos = allPhotos.concat(photos);
    }
  }
  return allPhotos;
});
