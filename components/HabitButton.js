import { useState } from "react";

const HabitButton = ({ date }) => {
  const [complete, setComplete] = useState(false);
  return (
    <span>
      {date.getMonth() + 1}/{date.getDate()}
      <button onClick={() => setComplete(!complete)}>
        {complete ? "X" : "O"}{" "}
      </button>
    </span>
  );
};

export default HabitButton;
