import React, { useMemo } from 'react';

import styles from './Button.module.scss';

const Button = ({ children, onClick, theme = 'primary', className, disabled }) => {
  const currentStyles = useMemo(() => {
    const baseStyles = `${styles.button} ${styles[`button_${theme}`]}`;
    if (className) {
      return baseStyles + ` ${className}`;
    }
    return baseStyles;
  }, [className])

  return (<button onClick={onClick} className={currentStyles} disabled={disabled}>
    {children}
  </button>)
}

export default Button;