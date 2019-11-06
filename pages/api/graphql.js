//Short way with Next.js req and res
export default (req, res) => {
  res.status(200).json({
    test: "Hello Testing the endpoint"
  });
};

//Longer Way
// export default (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.statusCode = 200;
//   res.end(
//     JSON.stringify({
//       test: "Hello Testing the endpoint"
//     })
//   );
// };
