import { useState } from "react";
import { ImageContext } from "./imageContext";

export const ContextProvider = ({ children }: any) => {
  const [image, setImage] = useState<File | null>(null);

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
};
