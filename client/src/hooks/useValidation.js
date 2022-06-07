import { useEffect, useState } from "react"

const RULES = {
  MIN_LENGTH: 'minLength',
  IS_EMPTY: 'isEmpty',
  IS_EMAIL: 'isEmail',
  IS_PASSWORD: 'isPassword'
}

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/

export const useValidation = (value, validationRules) => {
  const [isEmptyErr, setIsEmptyErr] = useState(false);
  const [minLengthErr, setMinLengthErr] = useState(false);
  const [isEmailErr, setIsEmailErr] = useState(false);
  const [isPasswordErr, setIsPasswordErr] = useState(false);

  useEffect(() => {
    for (let rule in validationRules) {
      switch (rule) {
        case RULES.MIN_LENGTH:
          if (value.length < validationRules[rule]) {
            !minLengthErr && setMinLengthErr({ message: `min length should be ${validationRules[rule]}` })
          } else {
            minLengthErr && setMinLengthErr(false)
          }
          break;
        case RULES.IS_EMPTY: {
          if (value) {
            isEmptyErr && setIsEmptyErr(false)
          } else {
            !isEmptyErr && setIsEmptyErr({ message: `Field should be not empty` })
          }
          break
        }
        case RULES.IS_EMAIL: {
          const isMatched = emailRegex.test(value);
          if (isMatched) {
            isEmailErr && setIsEmailErr(false)
          } else {
            !isEmailErr && setIsEmailErr({ message: `Incorrect Email` })
          }
          break
        }
        case RULES.IS_PASSWORD: {
          const isMatched = passwordRegex.test(value);
          if (isMatched) {
            isPasswordErr && setIsPasswordErr(false)
          } else {
            !isPasswordErr && setIsPasswordErr(
              {
                message: `Incorrect password! Password should have min 1 char in lowerCase, 
              min 1 char in Upeer case, min 1 number and contain special symbols `
              }
            )
          }
          break
        }
        default: break;
      }
    }
  }, [value])

  return {
    isEmptyErr,
    minLengthErr,
    isEmailErr,
    isPasswordErr,
  }
}