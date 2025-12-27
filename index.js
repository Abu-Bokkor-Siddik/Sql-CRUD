const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const pool = require("./db"); //importing the db.js file
const app = express();
const PORT = process.env.PORT || 5000;

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.get("/", (req, res) => {
  res.send("Node.js server is running");
});
// All books route
app.get("/api/books", async (req, res) => {
  try {
    const allBooks = await pool.query("SELECT * FROM book");
    res.status(200).json({ status: "OK", data: allBooks?.rows });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Get single book route
app.get("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await pool.query("SELECT * FROM book WHERE id = $1", [id]);
    res
      .status(200)
      .json({ message: "Get single book id:", id, data: book?.rows });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Post book route
app.post("/api/books", async (req, res) => {
  try {
    // const id = uuidv4();
    function get7DigitNumber() {
      return Math.floor(1000000 + Math.random() * 9000000);
    }

    const id = get7DigitNumber();
    const { name, description } = req.body;
    // insert into db here
    const newBook = await pool.query(
      "INSERT INTO book(id, name, description) VALUES($1, $2, $3) RETURNING *",
      [id, name, description]
    );
    // console.log(name, description);
    res.status(201).json({ message: "Book added", data: newBook?.rows });
  } catch (error) {
    res.json({ message: error.message });
  }
});
//delete book route
app.delete("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM book WHERE id = $1", [id]);
    res.status(201).json({ message: "Book delete", id });
  } catch (error) {
    res.json({ message: error.message });
  }
});
//update book route
app.put("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updateBook = await pool.query(
      "UPDATE book SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [name, description, id]
    );
    // console.log(name, description);
    res.status(201).json({ message: "Book updated", data: updateBook?.rows });
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
