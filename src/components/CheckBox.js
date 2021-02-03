import React from "react";
import styled from "styled-components";

import { ReactComponent as CheckIcon } from "../assets/check-solid.svg";

const CheckBox = ({ className, isChecked = false, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {isChecked && <CheckIcon className="icon" />}
    </div>
  );
};

const StyledCheckBox = styled(CheckBox)`
  width: 10px;
  height: 22px;
  border-radius: 10px;
  border: 1px solid rgb(255, 88, 0);
  background: ${(props) =>
    props.isChecked ? "rgb(255, 88, 0)" : "rgb(51, 51, 51)"};
  margin-left: -1px;
  display: flex;
  justify-content: center;
  align-items: center;

  > .icon {
    width: 20px;
    color: white;
  }
`;

export { StyledCheckBox as CheckBox };
