"use client";

import { pdfjs } from "react-pdf";
const FileViewerReactPdfProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
  return children;
};

export default FileViewerReactPdfProvider;
