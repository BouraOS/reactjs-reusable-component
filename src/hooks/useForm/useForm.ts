//  Simple form handler

import { useState, useCallback, useMemo } from "react";

type ValidationRule = {
  validate: (value: any, formValues: Record<string, any>) => boolean;
  message: string;
};

type FieldConfig = {
  initialValue: any;
  rules?: ValidationRule[];
};

type FormConfig = Record<string, FieldConfig>;

type FormErrors = Record<string, string[]>;

function useFormHandler<T extends Record<string, any>>(config: FormConfig) {
  // Initialize form state
  const initialValues = useMemo(() => {
    return Object.entries(config).reduce((acc, [name, fieldConfig]) => {
      acc[name as keyof T] = fieldConfig.initialValue;
      return acc;
    }, {} as T);
  }, [config]);

  // Form state
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a specific field
  const validateField = useCallback(
    (name: string, value: any) => {
      const fieldConfig = config[name];
      if (!fieldConfig?.rules) return [];

      return fieldConfig.rules
        .filter((rule) => !rule.validate(value, values))
        .map((rule) => rule.message);
    },
    [config, values]
  );

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    Object.keys(config).forEach((name) => {
      const fieldErrors = validateField(name, values[name]);
      if (fieldErrors.length > 0) {
        newErrors[name] = fieldErrors;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [config, validateField, values]);

  // Set a field value
  const setValue = useCallback(
    (name: string, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      // Validate field on change
      const fieldErrors = validateField(name, value);
      setErrors((prev) => {
        if (fieldErrors.length === 0) {
          const { [name]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [name]: fieldErrors };
      });
    },
    [validateField]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void> | void) =>
      async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        // Validate all fields
        const isFormValid = validateForm();
        if (!isFormValid) return;

        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Form submission error:", error);
        } finally {
          setIsSubmitting(false);
        }
      },
    [validateForm, values]
  );

  // Reset the form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    // Form state
    values,
    errors,
    isSubmitting,

    // Form actions
    handleSubmit,
    setValue,
    reset,
  };
}

export default useFormHandler;
