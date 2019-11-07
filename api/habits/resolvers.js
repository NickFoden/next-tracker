export const habitsResolvers = {
  Query: {
    async habits() {
      console.log("Habits");
      return [
        {
          _id: "some id",
          name: "Make bed"
        }
      ];
    }
  }
};
