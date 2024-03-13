import express from "express";

// console.log(process.argv); // array of node args "node server.js development" => ["node_path", "file_path of server.js", "development"]

const PORT = 8000;
const app = express();
// const environment = "development"; // or "production" in this way we have to manually change it every time
// const environment = process.argv[2] // getting it from node arguments;
const environment = process.env.NODE_ENV;


app.get("/", (req, res) => {
  res.send("Welcome to the Test API! endpoints: /user-info and /random-color");
});

app.get("/user-info", (req, res) => {
  res.json({
    _id: 1234567890,
    username: "Jane123",
    email: "jane.doe@example.com",
    age: 25,
  });
});

app.get("/random-color", (req, res) => {
  let color = "#";
  const hex = "0123456789abcdef";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hex.length);
    color += hex[randomIndex];
  }

  res.json({ hexColor: color });
});

app.listen(PORT, () => {
  if (environment === "development") {
    console.log(`listening on http://localhost:${PORT}`);
  } else {
    console.log(`Server running on production`);
  }
});
