const express = require("express");
const router = express.Router();
const db = require("../config/db");

// CREATE assessment
router.post("/", (req, res) => {
  const { assessment_id, term, year } = req.body;

  const sql =
    "INSERT INTO assessments (assessment_id, term, year) VALUES (?, ?, ?)";

  db.query(sql, [assessment_id, term, year], (err, result) => {
    if (err) {
      console.log("Assessment Insert Error:", err);
      return res.status(500).json(err);
    }

    res.json({ message: "Assessment added successfully" });
  });
});

// GET all assessments
router.get("/", (req, res) => {
  db.query("SELECT * FROM assessments", (err, result) => {
    if (err) {
      console.log("Assessment Fetch Error:", err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// GET single assessment
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM assessments WHERE assessment_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

// UPDATE assessment
router.put("/:id", (req, res) => {
  const { term, year } = req.body;

  const sql =
    "UPDATE assessments SET term = ?, year = ? WHERE assessment_id = ?";

  db.query(sql, [term, year, req.params.id], (err, result) => {
    if (err) {
      console.log("Assessment Update Error:", err);
      return res.status(500).json(err);
    }

    res.json({ message: "Assessment updated successfully" });
  });
});

// DELETE assessment
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM assessments WHERE assessment_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Assessment deleted successfully" });
    }
  );
});

module.exports = router;