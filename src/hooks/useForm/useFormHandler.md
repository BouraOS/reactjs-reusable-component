# `useFormHandler` Hook Documentation

This document demonstrates the usage of two versions of the `useFormHandler` hook:

1. **Full-Featured Version**: A comprehensive form handler with advanced features like `touched` state, `transform` functions, and derived states (`isValid`, `isDirty`).
2. **Simplified Version**: A lightweight form handler focused on core functionality (state management, validation, and submission).

---

## Table of Contents

1. [Full-Featured Version](#full-featured-version)
   - [Features](#features)
   - [Usage Example](#full-featured-usage-example)
2. [Simplified Version](#simplified-version)
   - [Features](#simplified-features)
   - [Usage Example](#simplified-usage-example)
3. [When to Use Which Version](#when-to-use-which-version)

---

## Full-Featured Version

### Features

- **Form State Management**: Manages `values`, `errors`, and `touched` state.
- **Validation**: Supports field-level and form-level validation.
- **Derived States**: Provides `isValid` and `isDirty` flags.
- **Field Transformation**: Allows transforming field values using `transform` functions.
- **Form Actions**: Includes `handleSubmit`, `setValue`, `reset`, `setError`, `clearErrors`, and `setTouched`.

### Full-Featured Usage Example

```tsx
import React from "react";
import useFormHandler from "./useFormHandler";

const MyForm = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    register,
    handleSubmit,
    reset,
  } = useFormHandler({
    email: {
      initialValue: "",
      rules: [
        {
          validate: (value) => !!value,
          message: "Email is required",
        },
        {
          validate: (value) => /\S+@\S+\.\S+/.test(value),
          message: "Invalid email format",
        },
      ],
    },
    password: {
      initialValue: "",
      rules: [
        {
          validate: (value) => !!value,
          message: "Password is required",
        },
        {
          validate: (value) => value.length >= 6,
          message: "Password must be at least 6 characters",
        },
      ],
    },
  });

  const onSubmit = async (values: any) => {
    console.log("Form submitted with values:", values);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register("email")} type="email" />
        {touched.email && errors.email && (
          <span>{errors.email.join(", ")}</span>
        )}
      </div>
      <div>
        <label>Password</label>
        <input {...register("password")} type="password" />
        {touched.password && errors.password && (
          <span>{errors.password.join(", ")}</span>
        )}
      </div>
      <button type="submit" disabled={isSubmitting || !isValid || !isDirty}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default MyForm;
```

## Simplified Version

### Features

- **Form State Management**: Manages values and errors state.

- **Validation**: Supports field-level and form-level validation.

- **Form Actions**: Includes `handleSubmit`, `setValue`, and `reset`.

### Simplified Usage Example

```tsx
import React from "react";
import useFormHandler from "./useFormHandler";

const MyForm = () => {
  const { values, errors, isSubmitting, handleSubmit, setValue, reset } =
    useFormHandler({
      email: {
        initialValue: "",
        rules: [
          {
            validate: (value) => !!value,
            message: "Email is required",
          },
          {
            validate: (value) => /\S+@\S+\.\S+/.test(value),
            message: "Invalid email format",
          },
        ],
      },
      password: {
        initialValue: "",
        rules: [
          {
            validate: (value) => !!value,
            message: "Password is required",
          },
          {
            validate: (value) => value.length >= 6,
            message: "Password must be at least 6 characters",
          },
        ],
      },
    });

  const onSubmit = async (values: any) => {
    console.log("Form submitted with values:", values);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={values.email}
          onChange={(e) => setValue("email", e.target.value)}
        />
        {errors.email && <span>{errors.email.join(", ")}</span>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={values.password}
          onChange={(e) => setValue("password", e.target.value)}
        />
        {errors.password && <span>{errors.password.join(", ")}</span>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default MyForm;
```

### When to Use Which Version

Use the **Full-Featured Version** if:

- You need advanced features like touched state, transform functions, or derived states (isValid, isDirty).

- Your form has complex validation requirements.

- You want a more declarative API with register for field registration.

Use **the Simplified Version** if:

- You need a lightweight form handler for basic forms.

- You want to avoid unnecessary complexity and keep the codebase minimal.

- Your form has straightforward validation and state management needs.

### Conclusion

Both versions of the `useFormHandler` hook are designed to handle form state and validation effectively. Choose the version that best fits your project's requirements. The full-featured version is ideal for complex forms, while the simplified version is perfect for lightweight use cases.

For more advanced use cases, you can extend the simplified version with additional features as needed.
