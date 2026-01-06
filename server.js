const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ TEST API (THIS WAS MISSING)
app.get("/api/test", (req, res) => {
  res.json({ message: "Frontend connected to backend successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
