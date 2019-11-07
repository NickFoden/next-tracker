import HabitButton from "./HabitButton";

const colors = ["#718096", "#F56565", "#F6E05E", "#68D391", "#63B3ED"];

const Habit = ({ habit, index }) => {
  const dates = getLast5Days();
  return (
    <article>
      <h3 style={{ borderColor: colors[index] }}>{habit.name}</h3>
      <div className="buttons">
        {dates.map(date => (
          <HabitButton key={date.getTime()} date={date} />
        ))}
      </div>
      <style jsx>
        {`
          article {
            padding: 20px;
            border-radius: 15px;
            box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
          }
          h3 {
            border-bottom: solid 4px;
            margin-top: 0;
          }
          .buttons {
            display: flex;
          }
        `}
      </style>
    </article>
  );
};

const getLast5Days = () => {
  const dates = "01234".split("").map(day => {
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - day);
    return tempDate;
  });
  return dates;
};

export default Habit;
