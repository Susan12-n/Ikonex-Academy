const express = require("express");
const router = express.Router();
const db = require("../config/db");
const PDFDocument = require("pdfkit");

/**
 * GENERATE STUDENT REPORT CARD
 */
router.get("/:student_id", (req, res) => {
  const studentId = req.params.student_id;

  const sql = `
    SELECT 
      s.student_id,
      s.first_name,
      s.last_name,
      sub.subject_name,
      sc.marks,

      (SELECT SUM(marks) FROM scores WHERE student_id = s.student_id) AS total_marks,
      (SELECT AVG(marks) FROM scores WHERE student_id = s.student_id) AS average_marks

    FROM students s
    JOIN scores sc ON s.student_id = sc.student_id
    JOIN subjects sub ON sc.subject_id = sub.subject_id
    WHERE s.student_id = ?;
  `;

  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const student = result[0];

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${student.first_name}_report.pdf`
    );

    doc.pipe(res);

    // HEADER
    doc.fontSize(20).text("STUDENT REPORT CARD", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Student ID: ${student.student_id}`);
    doc.text(`Name: ${student.first_name} ${student.last_name}`);
    doc.moveDown();

    // TABLE HEADER
    doc.text("SUBJECTS & MARKS");
    doc.moveDown(0.5);

    result.forEach((row) => {
      doc.text(`${row.subject_name}: ${row.marks}`);
    });

    doc.moveDown();

    // SUMMARY
    doc.text(`Total Marks: ${student.total_marks}`);
    doc.text(`Average: ${Number(student.average_marks).toFixed(2)}`);

    // SIMPLE GRADE SYSTEM
    let grade = "E";
    const avg = student.average_marks;

    if (avg >= 80) grade = "A";
    else if (avg >= 70) grade = "B";
    else if (avg >= 60) grade = "C";
    else if (avg >= 50) grade = "D";

    doc.text(`Grade: ${grade}`);

    doc.end();
  });
});

module.exports = router;