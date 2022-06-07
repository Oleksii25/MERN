import { useEffect, useState } from "react"
import { useValidation } from "./useValidation";

export const useInput = (initialValue = '', validationRules) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const validation = useValidation(value, validationRules)

  const onChange = ({ target }) => {
    setValue(target.value);
  }

  const onBlur = () => {
    setIsDirty(true);
  }

  useEffect(() => {
    if (Object.values(validation).every(value => !value)) {
      !isValid && setIsValid(true);
    } else {
      isValid && setIsValid(false)
    }
  }, [validation])

  return { value, onBlur, onChange, isDirty, validation, isValid }
}