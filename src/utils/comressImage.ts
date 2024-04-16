import imageCompression from "browser-image-compression";

function blobToFile(blob: Blob, fileName: string): File {
  // Create a new File object
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

export async function compressImage(imageFile: File): Promise<Blob> {
  if (!imageFile) {
    throw new Error("No image file provided");
  }

  const reader = new FileReader();
  reader.readAsArrayBuffer(imageFile);

  return new Promise((resolve, reject) => {
    reader.onload = async (event: any) => {
      const imageData = event.target.result as any;
      const imageSize = imageData.byteLength;

      if (imageSize <= 1 * 1024 * 1024) {
        // Check if image is under 5MB
        return resolve(imageFile); // Return original image if size is good
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1 * 1024 * 1024,
        useWebWorker: true,
      };
      imageCompression(imageFile, options)
        .then(function (compressedFile) {
          console.log(
            "compressedFile instanceof Blob",
            compressedFile instanceof Blob
          ); // true
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          ); // smaller than maxSizeMB

          resolve(blobToFile(compressedFile, imageFile.name));
        })
        .catch(function (error) {
          reject(error);
        });
    };

    reader.onerror = reject;
  });
}
