const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb://127.0.0.1:27017/testdb");


const User = mongoose.model("User", {
  name: String,
  age: Number,
  email: String
});


app.get("/users", (req, res) => {
  res.render("users");
});


app.post("/users", async (req, res) => {

  const { name, age, email } = req.body;

  let errors = [];

  if (!name) errors.push("Имя обязательно");
  if (!age || age < 1 || age > 120) errors.push("Возраст некорректный");
  if (!email || !email.includes("@")) errors.push("Email неверный");

  if (errors.length > 0) {
    return res.render("result", {
      success: false,
      errors
    });
  }


  const user = new User({ name, age, email });
  await user.save();

  res.render("result", {
    success: true,
    user
  });

});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});