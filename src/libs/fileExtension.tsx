export function removeFileExtension(fileName: string) {
    return fileName.replace(/\.[^/.]+$/, "");
  }