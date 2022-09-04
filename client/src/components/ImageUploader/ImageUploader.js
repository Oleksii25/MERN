import React, { useMemo, useRef, useState } from 'react';
import Button from 'components/Button/Button';

import styles from './ImageUploader.scss';

const ImageUploader = ({ wrapeerCN, inputCN, onChange, disabled, multiple, btnCN, name }) => {
  const imageInput = useRef();

  const wrapperStyles = useMemo(() => {
    const baseStyles = `${styles.uploader}`;
    if (wrapeerCN) {
      return baseStyles + ` ${wrapeerCN}`;
    }
    return baseStyles;
  }, [wrapeerCN]);

  const inputStyles = useMemo(() => {
    const baseStyles = `${styles.uploader__input}`;
    if (inputCN) {
      return baseStyles + ` ${inputCN}`;
    }
    return baseStyles;
  }, [inputCN]);

  const btnStyles = useMemo(() => {
    const baseStyles = `${styles.uploader__btn}`;
    if (btnCN) {
      return baseStyles + ` ${btnCN}`;
    }
    return baseStyles;
  }, [btnCN]);

  const onAddImage = ({ target }) => {
    if (onChange) {
      onChange(target.files, target.name)
    }
  }

  const callClick = () => {
    if (imageInput.current) {
      imageInput.current.click()
    }
  }

  return (
    <div className={wrapperStyles}>
      <input
        type="file"
        className={inputStyles}
        onChange={onAddImage}
        ref={imageInput}
        multiple={multiple}
        name={name}
      />
      <Button
        onClick={callClick}
        disabled={disabled}
        className={btnStyles}
      >
        Add Image
      </Button>
    </div>
  )
}

export default ImageUploader;
