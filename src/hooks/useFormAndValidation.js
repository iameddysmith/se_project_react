import { useState, useCallback, useEffect } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));

    const form = e.target.closest("form");
    if (form) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: e.target.validationMessage,
      }));
      setIsTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
      setIsValid(form.checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsTouched({});
      const form = document.querySelector("form");
      if (form) {
        setIsValid(form.checkValidity());
      }
    },
    []
  );

  useEffect(() => {
    const form = document.querySelector("form");
    setIsValid(form ? form.checkValidity() : false);
  }, [values, errors, isTouched]);

  return {
    values,
    handleChange,
    errors,
    isValid,
    isTouched,
    resetForm,
    setValues,
    setIsValid,
    setErrors,
  };
}
