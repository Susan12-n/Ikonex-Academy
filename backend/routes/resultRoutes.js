const express = require("express");
const router = express.Router();
const db = require("../config/db");

/**
 * GET CLASS RESULTS WITH RANKING
 */
router.get("/class-results", (req, res) => {
  const sql = `
    SELECT 
      s.student_id,
      s.first_name,
      s.last_name,

      SUM(sc.marks) AS total_marks,
      AVG(sc.marks) AS average_marks,

      RANK() OVER (ORDER BY SUM(sc.marks) DESC) AS position

    FROM students s
    JOIN scores sc ON s.student_id = sc.student_id
    GROUP BY s.student_id
    ORDER BY total_marks DESC;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

module.exports = router;