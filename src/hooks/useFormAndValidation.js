import { useState, useCallback, useEffect } from "react";

export function useFormAndValidation(formRef) {
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

    if (formRef.current) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: e.target.validationMessage,
      }));
      setIsTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
      setIsValid(formRef.current.checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsTouched({});
      if (formRef.current) {
        setIsValid(formRef.current.checkValidity());
      }
    },
    [formRef]
  );

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  }, [values, errors, isTouched, formRef]);

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
