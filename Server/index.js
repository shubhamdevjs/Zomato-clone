require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";

const zomato = express();

// Database Collection
import ConnectDB from "./Database/connection";

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(cors());
zomato.use(helmet());

zomato.get("/", (req, res) => {
  res.json({ message: "Setup Successful" });
});

zomato.listen(4000, () =>
  ConnectDB()
    .then(() => console.log("Server up and Running "))
    .catch((error) => {
      console.log(error);
      console.log("Server is running, but database connection failed ...");
    })
);
