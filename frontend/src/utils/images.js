import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export const optimizeImage = async (image, width = 500, height = 500) => {
    try {
      const optimizedImage = await manipulateAsync(
        image.uri,
        [{ resize: { width, height } }],
        { format: SaveFormat.JPEG, compress: 0.25 }
      );
      return optimizedImage;
    } catch (error) {
      console.error("Error manipulating image:", error);
    }
  };
