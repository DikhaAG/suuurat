import WebViewer, { WebViewerInstance } from "@pdftron/webviewer";
import { useEffect, useRef } from "react";

interface FileViewerHistoryInterface {
  file: string;
}
const FileViewer = async ({ file }: FileViewerHistoryInterface) => {
  const viewer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    import("@pdftron/webviewer").then(() => {
      WebViewer(
        {
          path: "/webviewer/lib",
          licenseKey:
            "demo:1730828003931:7ee62c5e0300000000f789a9976b5a2c7408f50275affd887fb1a602e8",
          initialDoc: file,
        },
        viewer.current as HTMLDivElement
      ).then((instance) => {
        const docViewer: WebViewerInstance = instance;
      });
    });
  }, []);
  return (
    <div className="">
      <div className="webviewer h-[100vh]" ref={viewer}></div>
    </div>
  );
};

export default FileViewer;
