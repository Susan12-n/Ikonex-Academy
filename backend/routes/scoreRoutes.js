const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ADD SCORE */
router.post("/", (req, res) => {
  const {
    student_id,
    subject_id,
    assessment_id,
    marks,
  } = req.body;

  db.query(
    `INSERT INTO scores
    (student_id, subject_id, assessment_id, marks)
    VALUES (?, ?, ?, ?)`,
    [student_id, subject_id, assessment_id, marks],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Score added successfully",
      });
    }
  );
});

/* GET ALL SCORES */
router.get("/", (req, res) => {
  const sql = `
    SELECT
      sc.score_id,
      sc.student_id,
      CONCAT(st.first_name,' ',st.last_name) AS student_name,
      sc.subject_id,
      sb.subject_name,
      sc.assessment_id,
      a.assessment_name,
      sc.marks
    FROM scores sc
    LEFT JOIN students st
      ON sc.student_id = st.student_id
    LEFT JOIN subjects sb
      ON sc.subject_id = sb.subject_id
    LEFT JOIN assessments a
      ON sc.assessment_id = a.assessment_id
    ORDER BY sc.score_id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

/* GET ONE SCORE */
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM scores WHERE score_id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result[0]);
    }
  );
});

/* UPDATE SCORE */
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const {
    student_id,
    subject_id,
    assessment_id,
    marks,
  } = req.body;

  db.query(
    `UPDATE scores
     SET student_id = ?,
         subject_id = ?,
         assessment_id = ?,
         marks = ?
     WHERE score_id = ?`,
    [
      student_id,
      subject_id,
      assessment_id,
      marks,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Score updated successfully",
      });
    }
  );
});

/* DELETE SCORE */
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM scores WHERE score_id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Score deleted successfully",
      });
    }
  );
});

module.exports = router;