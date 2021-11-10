import { useEffect } from "react";
import { useRef } from "react";

const useDocumentTitle = (title, prevailOnUnmount = false) => {
  const defaultTitle = useRef(document.title);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
        return;
      }
    },
    [prevailOnUnmount]
  );

  useEffect(() => {
    document.title = `${title} - Carx`;
  }, [title]);
};

export default useDocumentTitle;
