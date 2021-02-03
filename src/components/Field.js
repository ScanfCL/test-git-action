import React from "react";
import styled from "styled-components";

const Field = ({ className, type, label }) => {
  return (
    <div className={className}>
      <div className="label">{label}</div>
      <input className="input-field" type={type} />
    </div>
  );
};

const StyledField = styled(Field)`
  margin-bottom: 20px;
  width: 100%;

  > .label {
    font-size: 12px;
    color: white;
    margin-bottom: 5px;
  }

  > .input-field {
    background: rgb(29, 29, 29);
    border: 1px solid white;
    height: 30px;
    font-size: 14px;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    width: calc(100% - 20px);

    &:focus {
      outline: none;
      border: 1px solid rgb(255, 88, 0);
      color: rgb(255, 88, 0);
    }
  }
`;

export { StyledField as Field };
