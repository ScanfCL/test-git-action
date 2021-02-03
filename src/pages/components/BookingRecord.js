import React from "react";
import styled from "styled-components";
import { FirestoreBatchedWrite } from "@react-firebase/firestore";

import { CheckBox } from "../../components/CheckBox";

const BookingRecord = ({
  className,
  isSelected,
  booking,
  handleSelectUser,
  scheduleId,
}) => {
  return (
    <div className={className}>
      <CheckBox
        isChecked={isSelected}
        onClick={() => handleSelectUser(booking.id)}
      />
      <div>{booking.name.trim()}</div>
      <FirestoreBatchedWrite>
        {({ addMutationToBatch, commit }) => (
          <div
            className={isSelected ? "disabled" : ""}
            onClick={() => {
              addMutationToBatch({
                path: `/classes/${scheduleId}/booking/${booking.id}`,
                value: { status: "ATTENDED" },
                type: "update",
              });
              commit();
            }}
          >
            CHECK IN
          </div>
        )}
      </FirestoreBatchedWrite>
    </div>
  );
};

const StyledBookingRecord = styled(BookingRecord)`
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  border: 1px solid
    ${(props) =>
      props.isSelected ? "rgb(255, 88, 0, 0.3)" : "rgb(255, 88, 0)"};
  margin-bottom: 20px;
  border-radius: 10px;

  > div:first-child {
    flex: 1;
    padding: 10px 5px;
  }

  > div:nth-child(2) {
    flex: 6;
    padding: 10px 5px;
    opacity: ${(props) => (props.isSelected ? 0.3 : 1)};
  }

  > div:nth-child(3) {
    padding: 10px 5px;
    flex: 3;
    width: 100%;
    background: rgb(255, 88, 0);
    border: 1px solid rgb(255, 88, 0);
    border-radius: 10px;
    margin-right: -1px;
    text-align: center;
    font-weight: bold;

    &.disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  }
`;

export { StyledBookingRecord as BookingRecord };
