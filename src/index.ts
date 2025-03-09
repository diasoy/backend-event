import express from "express";
import router from "./routes/api";
import bodyParser from "body-parser";
import db from "./utils/database";

async function init() {
  try {
    const result = await db();
    console.log(result);

    const app = express();
    app.use(bodyParser.json());

    const PORT = 3000;

    app.get("/", (req, res) => {
      res.send("Server is running");
    });

    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
