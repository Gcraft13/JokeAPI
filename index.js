import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import JokeAPI from "sv443-joke-api";

const app = express();
const port = 3000;
const URL = "https://v2.jokeapi.dev/joke/Any";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

JokeAPI.getJokes({
  jokeType: "single",
})
  .then((r) => r.json())
  .then((data) => {
    updateUI(data);
  });

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(URL);
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
