export async function imageUrlToFile(
  url: string,
  fileName: string
): Promise<File> {
  // Fetch the image data
  const response = await fetch(url);
  const contentType = response.headers.get("content-type") as any;
  const blob = await response.blob();
  const extensions: { [key: string]: string } = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/jpg": "jpg",
    // Add more MIME types and their corresponding file extensions as needed
  };
  const extension = extensions[contentType] || "jpg";
  // Create a new File object from the Blob data
  const file = new File([blob], `${fileName}.${extension}`, {
    type: contentType,
  });

  return file;
}

export function base64ToFile(base64Data: string, filename: string): any {
  try {
    // Split the data URI to get content type (optional)
    const dataParts = base64Data.split(";base64,");
    const contentType = dataParts[0]?.split(":")[1] || "";

    // Decode the base64 string
    const base64String = dataParts[1];
    const byteString = atob(base64String);
    const bytes = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      bytes[i] = byteString.charCodeAt(i);
    }

    // Create a Blob object
    const blob = new Blob([bytes], { type: contentType });

    // Create a File object
    const file = new File([blob], filename, { type: contentType });
    return file;
  } catch (error) {
    console.error("Error converting base64 to file:", error);
    // You can optionally throw the error further for more specific handling
    // throw error;
  }
}
