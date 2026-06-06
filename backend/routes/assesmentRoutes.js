const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* CREATE */
router.post("/", (req, res) => {
  const { assessment_id, term, year } = req.body;

  if (!assessment_id || !term || !year) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql =
    "INSERT INTO assessments (assessment_id, term, year) VALUES (?, ?, ?)";

  db.query(sql, [assessment_id, term, year], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json(err);
    }

    res.json({ message: "Assessment created successfully" });
  });
});

/* READ */
router.get("/", (req, res) => {
  db.query("SELECT * FROM assessments", (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

/* UPDATE */
router.put("/:id", (req, res) => {
  const { term, year } = req.body;

  db.query(
    "UPDATE assessments SET term=?, year=? WHERE assessment_id=?",
    [term, year, req.params.id],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Updated successfully" });
    }
  );
});

/* DELETE */
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM assessments WHERE assessment_id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Deleted successfully" });
    }
  );
});

module.exports = router;