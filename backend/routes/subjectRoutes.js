const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ADD SUBJECT */
router.post("/", (req, res) => {
  const { subject_id, subject_name } = req.body;

  db.query(
    "INSERT INTO subjects (subject_id, subject_name) VALUES (?, ?)",
    [subject_id, subject_name],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Subject added successfully",
      });
    }
  );
});

/* GET ALL SUBJECTS */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM subjects",
    (err, result) => {
      if (err) {
        console.log("SUBJECT ERROR:", err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/* GET ONE SUBJECT */
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM subjects WHERE subject_id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({
          message: "Subject not found",
        });
      }

      res.json(result[0]);
    }
  );
});

/* UPDATE SUBJECT */
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { subject_name } = req.body;

  db.query(
    "UPDATE subjects SET subject_name = ? WHERE subject_id = ?",
    [subject_name, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Subject updated successfully",
      });
    }
  );
});

/* DELETE SUBJECT */
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM subjects WHERE subject_id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Subject deleted successfully",
      });
    }
  );
});

module.exports = router;