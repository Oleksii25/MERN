import React from "react";

const ValidationMessages = ({ validation, isDirty }) => {
  const messages = Object.values(validation);
  if (!isDirty || messages.every((value) => !value)) return null;

  return (
    <>
      {messages.map(({ message }, index) => (<div style={{ color: 'red' }} key={index}>{message}</div>))
      }
    </>
  )
}

export default ValidationMessages;