/* SnackbarContext.tsx */
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
} from "react";
import Snackbar from "./Snackbar.tsx";
import "./Snackbar.css";

interface SnackbarMessage {
  id: number;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    type?: SnackbarMessage["type"],
    duration?: number
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);
  const timeoutRefs = useRef<Record<number, NodeJS.Timeout>>({});

  const showSnackbar = (
    message: string,
    type?: SnackbarMessage["type"],
    duration = 3000
  ) => {
    const id = Date.now();
    setSnackbars((prev) => [...prev, { id, message, type, duration }]);

    const timeout = setTimeout(() => {
      removeSnackbar(id);
    }, duration);

    timeoutRefs.current[id] = timeout;
  };

  const removeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
    clearTimeout(timeoutRefs.current[id]);
    delete timeoutRefs.current[id];
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <div className="snackbar-container">
        {snackbars.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            {...snackbar}
            onClose={() => removeSnackbar(snackbar.id)}
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
