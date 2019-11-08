import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";

const ADD_EVENT = gql`
  mutation addEvent($date: Date, $habitId: ID) {
    addEvent(date: $date, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;
const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID, $habitId: ID) {
    addEvent(eventId: $eventId, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const HabitButton = ({ date }) => {
  return (
    <span>
      {date.getMonth() + 1}/{date.getDate()}
      <button onClick={() => setComplete(!complete)}>
        {complete ? "X" : "O"}{" "}
      </button>
      <style jsx>
        {`
          span {
            display: flex;
            flex-direction: column;
          }
          span + span {
            margin-left: 5px;
          }
          button {
            margin-top: 1rem;
            border: none;
          }
        `}
      </style>
    </span>
  );
};

export default HabitButton;
