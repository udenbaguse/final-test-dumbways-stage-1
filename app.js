import express from "express";
import hbs from "hbs";
import path from "path";


const app = express();

const __dirname = import.meta.dirname

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("layouts/main", {
    profile: {
      initials: "SYAM",
      name: "Syam",
      title: "Front End Web Developer",
      bio: "I'm a Front End Web Developer committed to delivering high-quality digital solutions. With a strong passion for creating user-friendly and visually appealing websites, I focus on building interfaces that drive user engagement and satisfaction. I enjoy solving problems through code and constantly refining my skills to keep up with the latest industry trends.",
      location: "Java Island (not JavaScript)",
      status: "Open to opportunities",
    },
  });
});

if (process.env.VERCEL !== "1") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
