# Checkbox Component

The `Checkbox` component is a customizable checkbox input for your forms.

## Usage

```tsx
import React, { useState, ChangeEvent } from "react";
import Checkbox from "./Checkbox";

const App = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleCheckboxChange}
        label="Accept Terms and Conditions"
        required
      />
    </div>
  );
};

export default App;
```

## Props

- `checked` (boolean): Whether the checkbox is checked.
- `onChange` (function): Callback function to handle change events.
- `label` (string): Label text for the checkbox.
- `disabled` (boolean): Whether the checkbox is disabled.
- `name` (string): Name attribute for the checkbox input.
- `id` (string): ID attribute for the checkbox input.
- `className` (string): Additional class names for the checkbox container.
- `required` (boolean): Whether the checkbox is required.
