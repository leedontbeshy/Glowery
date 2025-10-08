//Khởi tạo app Express, middleware, routes tổng
import express from "express";
import routes from "./features"; // import index.ts

const app = express();

app.use(express.json());
app.use("/api", routes);

export default app;