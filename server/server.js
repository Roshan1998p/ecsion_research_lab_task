const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 6969;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const usersFilePath = path.join(__dirname, "users.json");

const loadUsers = async () => {
  if (!fs.existsSync(usersFilePath)) {
    await fs.writeFileSync(usersFilePath, JSON.stringify([]));
  }
  const usersData = await fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

app.get("/users", async (req, res) => {
  const users = await loadUsers();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const users = await loadUsers();
  const newUser = req.body;
  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
