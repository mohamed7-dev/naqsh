import { useEvent } from "react-use";

const useWindowEvents = () => {
  useEvent("beforeunload", (event) => {
    event.returnValue = "Are you sure you want to leave,?";
  });
};

export { useWindowEvents };
