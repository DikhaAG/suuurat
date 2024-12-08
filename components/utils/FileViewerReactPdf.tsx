"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1 ? true : false}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber === numPages ? true : false}
        >
          Next
        </Button>
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
