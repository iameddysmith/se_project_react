import { useState, useCallback, useEffect } from "react";

export function useFormAndValidation(formRef) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const trimmedValue = typeof value === "string" ? value.trim() : value;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (
      formRef.current &&
      type === "text" &&
      trimmedValue === "" &&
      value.length > 0
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid name.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: e.target.validationMessage || "",
      }));
    }

    const formValidity = formRef.current.checkValidity();
    const hasNoSpaceOnlyValues = Object.entries(values).every(
      ([fieldName, fieldValue]) => {
        if (typeof fieldValue !== "string") return true;
        if (fieldName === name) return trimmedValue !== "";
        return fieldValue.trim() !== "";
      }
    );

    setIsValid(formValidity && hasNoSpaceOnlyValues);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  useEffect(() => {
    if (formRef.current) {
      const formValidity = formRef.current.checkValidity();
      const hasNoSpaceOnlyValues = Object.entries(values).every(
        ([fieldName, fieldValue]) => {
          if (typeof fieldValue !== "string") return true;
          return fieldValue.trim() !== "";
        }
      );
      setIsValid(formValidity && hasNoSpaceOnlyValues);
    }
  }, [values, errors]);

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
}
