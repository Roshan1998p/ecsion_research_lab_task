const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 6969;

app.use(cors());
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

// In-memory data store as a fallback for production
let inMemoryUsers = [];

const loadUsers = async () => {
  if (process.env.NODE_ENV === "production") {
    return inMemoryUsers;
  } else {
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
    const usersData = fs.readFileSync(usersFilePath);
    return JSON.parse(usersData);
  }
};

const saveUsers = async (users) => {
  if (process.env.NODE_ENV === "production") {
    inMemoryUsers = users;
  } else {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  }
};

app.get("/users", async (req, res) => {
  try {
    const users = await loadUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const users = await loadUsers();
    const newUser = req.body;
    users.push(newUser);
    await saveUsers(users);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
