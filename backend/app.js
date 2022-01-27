const express = require("express");

const User = require("../backend/models/users").default;
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

app = express();

mongoose.connect("mongodb://localhost:27017/Licenta", function (err) {
  if (err) {
    console.log("Failed to connect" + err);
  } else {
    console.log("You are connected to db");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use("/api/posts", (req, res, next) => {
//   const posts = [
//     {
//       id: "1",
//       title: "Lorem ipsum dolor sit amet",
//       price: "1500",
//       oldprice: "1501",
//       text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!",
//       photo: "../../assets/images/tvpng.png",
//       quantity: 1,
//     },
//     {
//       id: "2",
//       title: "Lorem ipsum dolor sit amet",
//       price: "3000",
//       oldprice: "",
//       text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!",
//       photo: "../../assets/images/iphone12.jpg",
//       quantity: 1,
//     },
//     {
//       id: "3",
//       title: "Lorem ipsum dolor sit amet",
//       price: "3500",
//       oldprice: "",
//       text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!",
//       photo: "../../assets/images/pc dark.jpeg",
//       quantity: 1,
//     },
//     {
//       id: "4",
//       title: "Lorem ipsum dolor sit amet",
//       price: "3500",
//       oldprice: "",
//       text: "Lorem, ipsum dolor sit amet conseLorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!ctetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!Lorem, ipsum dolor  sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi! text-overflow: ellipsis; text-overflow: ellipsis;",
//       photo: "../../assets/images/pc dark2.jpeg",
//       quantity: 1,
//     },
//   ];
//   res.status(200).json({
//     message: "Posts fetched succesfully",
//     posts: posts,
//   });
//   next();
// });

app.use("/api", userRoutes);

app.use("/api", productRoutes);

module.exports = app;
