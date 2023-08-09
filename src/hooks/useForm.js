import { useState } from "react";
import { isEmail } from "validator";

export const useForm = (inputValues) => {
  const [form, setForm] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "email") {
      const customError = !isEmail(value)
        ? "Формат электронной почты указан неверно"
        : "";
      setErrors({ ...errors, [name]: customError });
    } else {
      setErrors({ ...errors, [name]: event.target.validationMessage });
    }
    setForm({ ...form, [name]: value });
    setIsValid(event.target.closest("form").checkValidity());
  };

  return { form, isValid, errors, handleChange };
};