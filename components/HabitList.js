import Habit from "./Habit";

const HabitList = ({ habits }) => {
  return (
    <section>
      <h2>Trainings</h2>
      {habits.map(habit => (
        <Habit key={habit} habit={habit} />
      ))}
    </section>
  );
};

export default HabitList;
