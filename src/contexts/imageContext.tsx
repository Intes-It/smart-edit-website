import { createContext, useContext } from "react";

type imageContextType = {
  image: null | File;
  setImage: (value: null | File | string) => void;
};

export const ImageContext = createContext({});

export const useImageContext = () =>
  useContext(ImageContext) as imageContextType;
