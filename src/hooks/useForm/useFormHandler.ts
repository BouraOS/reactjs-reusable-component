// Advanced form handler

import { useState, useCallback, useMemo } from "react";

type ValidationRule = {
  validate: (value: any, formValues: Record<string, any>) => boolean;
  message: string;
};

type FieldConfig = {
  initialValue: any;
  rules?: ValidationRule[];
  transform?: (value: any) => any;
};

type FormConfig = Record<string, FieldConfig>;

type FormErrors = Record<string, string[]>;

type FormHandlerReturn<T> = {
  values: T;
  errors: FormErrors;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;

  register: (name: string) => {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error: string[] | undefined;
    touched: boolean;
  };

  handleSubmit: (
    onSubmit: (values: T) => Promise<void> | void
  ) => (e?: React.FormEvent) => Promise<void>;
  setValue: (name: string, value: any) => void;
  reset: () => void;
  setError: (name: string, error: string) => void;
  clearErrors: (name?: string) => void;
  setTouched: (name: string, isTouched?: boolean) => void;
};

function useFormHandler<T extends Record<string, any>>(
  config: FormConfig
): FormHandlerReturn<T> {
  const initialValues = useMemo(() => {
    return Object.entries(config).reduce((acc, [name, fieldConfig]) => {
      acc[name as keyof T] = fieldConfig.initialValue;
      return acc;
    }, {} as T);
  }, [config]);

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouchedState] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
  const isDirty = useMemo(() => {
    return (
      Object.keys(initialValues).length > 0 &&
      Object.keys(initialValues).some(
        (key) => initialValues[key] !== values[key]
      )
    );
  }, [initialValues, values]);

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

  const validateForm = useCallback(() => {
    const newErrors = validateAllFields(config, values, validateField);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [config, validateField, values]);

  const setValue = useCallback(
    (name: string, value: any) => {
      if (!config[name]) {
        console.error(`Field "${name}" does not exist in the form config.`);
        return;
      }

      setValues((prev) => {
        const newValues = { ...prev, [name]: value } as T;

        if (config[name]?.transform) {
          return { ...newValues, [name]: config[name].transform!(value) } as T;
        }

        return newValues;
      });

      const fieldErrors = validateField(name, value);
      setErrors((prev) => {
        if (fieldErrors.length === 0) {
          const { [name]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [name]: fieldErrors };
      });
    },
    [config, validateField]
  );

  const setTouched = useCallback((name: string, isTouched: boolean = true) => {
    setTouchedState((prev) => ({ ...prev, [name]: isTouched }));
  }, []);

  const memoizedFields = useMemo(() => {
    return Object.keys(config).reduce((acc, name) => {
      acc[name] = {
        name,
        value: values[name],
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
          setValue(name, value);
        },
        onBlur: () => setTouched(name),
        error: errors[name],
        touched: !!touched[name],
      };
      return acc;
    }, {} as Record<string, any>);
  }, [config, values, errors, touched, setValue, setTouched]);

  const register = useCallback(
    (name: string) => memoizedFields[name],
    [memoizedFields]
  );

  const setError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: [error] }));
  }, []);

  const clearErrors = useCallback((name?: string) => {
    if (name) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setErrors({});
    }
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouchedState({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void> | void) =>
      async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const allTouched = Object.keys(config).reduce(
          (acc, name) => ({ ...acc, [name]: true }),
          {}
        );
        setTouchedState(allTouched);

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
    [config, validateForm, values]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    setTouched,
  };
}

export default useFormHandler;

// Utility function
const validateAllFields = (
  config: FormConfig,
  values: any,
  validateField: (name: string, value: any) => string[]
): FormErrors => {
  const newErrors: FormErrors = {};
  Object.keys(config).forEach((name) => {
    const fieldErrors = validateField(name, values[name]);
    if (fieldErrors.length > 0) {
      newErrors[name] = fieldErrors;
    }
  });
  return newErrors;
};
