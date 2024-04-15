type typeUpload =
  | "remove-bg"
  | "remove-object"
  | "bokeh"
  | "face-change"
  | "anime-ai"
  | "face-id"
  | "enhance";

export type UploadImageProps = {
  imageBanner: string;
  title: string;
  optionsImage: string[];
  typeUpload: typeUpload;
};

type StrepGuideItem = {
  title: string;
  image: string;
};

export type StepGuideProps = {
  title: string;
  listSteps: StrepGuideItem[];
};
