import express from "express";

// console.log(process.argv); // array of node args "node server.js development" => ["node_path", "file_path of server.js", "development"]
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 8000;
const app = express();
// const environment = "development"; // or "production" in this way we have to manually change it every time
// const environment = process.argv[2] // getting it from node arguments;
const environment = process.env.NODE_ENV; // to use the variable inside the .env we need to write node --env-file=.env server.js (node has to be updated)
// process.env is an object



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

app.get("/weather/:location", async (req, res) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${req.params.location}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();

  res.json({
    location: data.name,
    country: data.sys.country,
    temp: data.main.temp,
    minTemp: data.main.temp_min,
    maxTemp: data.main.temp_max,
    humidity: data.main.humidity,
    description: data.weather[0].description,
  });
  // res.json(data);
});

app.listen(PORT, () => {
  if (environment === "development") {
    console.log(`listening on http://localhost:${PORT}`);
  } else {
    console.log(`Server running on production`);
  }
});
