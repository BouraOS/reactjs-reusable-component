# Snackbar

To use the Snackbar component in your React application, follow these steps:

### Step 1: Wrap your application with the `SnackbarProvider`

```tsx
import React from "react";
import { SnackbarProvider } from "./SnackBar/SnackbarContext";
import ExampleComponent from "./ExampleComponent";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <ExampleComponent />
    </SnackbarProvider>
  );
};

export default App;
```

### Step 2: Use the `useSnackbar` hook to show snackbars

```tsx
import React from "react";
import { useSnackbar } from "./SnackBar/SnackbarContext";

const ExampleComponent: React.FC = () => {
  const { showSnackbar } = useSnackbar();

  const handleClick = () => {
    showSnackbar("This is a success message!", "success", 3000);
  };

  return (
    <div>
      <button onClick={handleClick}>Show Snackbar</button>
    </div>
  );
};

export default ExampleComponent;
```

### Step 3: Customize the Snackbar component (optional)

You can customize the Snackbar component by modifying the `Snackbar.tsx` and `Snackbar.css` files.
