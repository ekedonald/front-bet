import { appName } from "@/config";
import { useEffect, useState } from "react";

const useDocumentTitle = (title: string) => {
  const [document_title, setDoucmentTitle] = useState(title);
   useEffect(() => {
    document.title = `${appName} | ${document_title || ''}`; 
  },[document_title]);

  return [document_title, setDoucmentTitle];
};

export {useDocumentTitle};