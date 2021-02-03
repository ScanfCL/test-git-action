import React, { useState } from "react";
import { FirestoreCollection } from "@react-firebase/firestore";
import styled from "styled-components";

import { BookingRecord } from "./components/BookingRecord";

const ListBooking = ({ className, addMutationToBatch, commit }) => {
  const [selectedUser, setSelectedUser] = useState([]);

  const queryString = decodeURIComponent(window.location.search).replace(
    "?liff.state=",
    ""
  );
  const params = new URLSearchParams(queryString);
  const scheduleId = params.get("scheduleId");

  const transformListBooking = (data) => {
    return {
      id: data.id,
      userId: data.user_id,
      name: data.user_name,
      status: data.status,
      photoUrl: data.photo_url,
    };
  };

  const handleSelectUser = (bookId) => {
    setSelectedUser((oldState) => {
      if (!oldState.find((id) => id === bookId)) {
        return [...oldState, bookId];
      }
      return oldState.filter((id) => bookId !== id);
    });
  };

  const handleUpdateBookingsSelectedAll = ({ d }) => {
    d.ids.forEach((bookingId) => {
      addMutationToBatch({
        path: `/classes/${scheduleId}/booking/${bookingId}`,
        value: { status: "ATTENDED" },
        type: "update",
      });
    });
    commit();
  };

  const handleUpdateBookingsSelected = () => {
    selectedUser.forEach((bookingId) => {
      addMutationToBatch({
        path: `/classes/${scheduleId}/booking/${bookingId}`,
        value: { status: "ATTENDED" },
        type: "update",
      });
    });
    commit();
  };

  return (
    <div className={className}>
      <FirestoreCollection path={`/classes/${scheduleId}/booking`}>
        {(d) => {
          const listBooking = d.value
            ?.filter((f) => f.status !== "ATTENDED")
            .map((data) => transformListBooking(data));
          return d.isLoading ? (
            <div className="wrapper-content">loading...</div>
          ) : (
            <div className="wrapper-booking">
              <div className="topic">Name List</div>
              {listBooking?.map((booking) => (
                <BookingRecord
                  key={booking.id}
                  isSelected={selectedUser.includes(booking.id)}
                  booking={booking}
                  handleSelectUser={handleSelectUser}
                  scheduleId={scheduleId}
                />
              ))}
              <div className="check-all" onClick={handleUpdateBookingsSelected}>
                SELECTED CHECK-IN
              </div>
              <div
                className="check-all"
                onClick={() =>
                  handleUpdateBookingsSelectedAll({
                    d,
                  })
                }
              >
                CHECK-IN ALL
              </div>
            </div>
          );
        }}
      </FirestoreCollection>
    </div>
  );
};

const StyledListBooking = styled(ListBooking)`
  > .wrapper-content {
    background: rgb(29, 29, 29);
    display: flex;
    min-height: 100vh;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 30px;
    flex-direction: column;
  }

  > .wrapper-booking {
    background: rgb(51, 51, 51);
    display: flex;
    min-height: 100vh;
    height: 100%;
    flex-direction: column;
    padding: 20px;
    color: white;

    > .topic {
      background: rgb(29, 29, 29);
      padding: 10px;
      margin-bottom: 20px;
      font-weight: bold;
    }

    > .row {
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      border: 1px solid rgb(255, 88, 0);
      margin-bottom: 20px;
      border-radius: 10px;

      > div:first-child {
        flex: 1;
        padding: 10px 5px;
      }

      > div:nth-child(2) {
        flex: 6;
        padding: 10px 5px;
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
    }

    > .check-all {
      background: rgb(251, 176, 59);
      padding: 10px;
      height: 30px;
      border-radius: 10px;
      font-weight: bold;
      justify-content: center;
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      &.disabled {
        opacity: 0.3;
        pointer-events: none;
      }
    }
  }
`;

export { StyledListBooking as ListBooking };
