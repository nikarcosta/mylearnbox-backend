import express, { json } from "express";
import cors from "cors";
import router from "./routes/index";
import { handleApplicationErrors } from "./middlewares/error-handling-middleware";

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(handleApplicationErrors);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
