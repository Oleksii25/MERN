import React, { useMemo } from "react";

import styles from './Input.scss';

const Input = ({ onChange, className, disabled, type = 'text', maxLength, placeholder = '', value = '', label, onBlur }) => {
  const currentStyles = useMemo(() => {
    const baseStyles = `${styles.input}`;
    if (className) {
      return baseStyles + ` ${className}`;
    }
    return baseStyles;
  }, [className])

  return label ? (
    <label className={styles.input__label}>
      {label}
      <input
        onChange={onChange}
        onBlur={onBlur}
        className={currentStyles}
        disabled={disabled}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
      />
    </label>) : (
    <input
      onChange={onChange}
      className={currentStyles}
      disabled={disabled}
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
    />)
}

export default Input;