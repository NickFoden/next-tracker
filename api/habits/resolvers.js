export const habitsResolvers = {
  Query: {
    async habits() {
      return [
        {
          _id: "some id",
          name: "Make bed"
        }
      ];
    }
  }
};
