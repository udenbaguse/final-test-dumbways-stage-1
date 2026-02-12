import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("layouts/main", {
    profile: {
      initials:
        "SYAM",
      name: "Syam",
      title: "Front End Web Developer",
      bio: "I'm a Front End Web Developer with a passion for creating user-friendly and visually appealing websites.",
      location: "Java Island(not script)",
      status: "Jomblo Fisabilillah",
    },
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});