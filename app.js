import express from "express";
import hbs from "hbs";
import path from "path";


const app = express();

const __dirname = import.meta.dirname
const staticDir = path.join(__dirname, "public");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views"));

app.disable("x-powered-by");
app.use(express.static(staticDir, {
  etag: true,
  lastModified: true,
  maxAge: "1h",
  setHeaders: (res, filePath) => {
    if (/\.(css|js|mjs|png|jpe?g|webp|gif|svg|ico|mp4|webm|woff2?)$/i.test(filePath)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return;
    }
    res.setHeader("Cache-Control", "public, max-age=3600");
  },
}));

app.get("/", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
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
