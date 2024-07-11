import { useState, useCallback, useEffect } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsTouched({ ...isTouched, [name]: true });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsTouched({});
    },
    [setValues, setErrors, setIsValid]
  );

  useEffect(() => {
    const form = document.querySelector("form");
    setIsValid(form ? form.checkValidity() : false);
  }, [values]);

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
