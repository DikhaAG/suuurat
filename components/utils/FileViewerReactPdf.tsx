"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
interface FileViewerReactPdfInterface {
  file: string;
}
const FileViewerReactPdf = ({ file }: FileViewerReactPdfInterface) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-fit mx-auto gap-5 text-2xl text-white">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          className={`bg-blue-500 hover:bg-blue-600 hover:scale-105 px-4 py-2 rounded-lg disabled:bg-blue-300`}
          disabled={pageNumber === 1 ? true : false}
        >
          {"<"}
        </button>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          className={`bg-blue-500 hover:bg-blue-600 hover:scale-105 px-4 py-2 rounded-lg disabled:bg-blue-300`}
          disabled={pageNumber === numPages ? true : false}
        >
          {">"}
        </button>
      </div>
      <div className="">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className={"max-h-screen items-center overflow-x-auto"}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
};

export default FileViewerReactPdf;
