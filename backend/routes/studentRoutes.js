const express= require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {

const {
admission_no,
first_name,
last_name,
gender,
stream_id
} = req.body;

db.query(
"INSERT INTO students(admission_no,first_name,last_name,gender,stream_id) VALUES(?,?,?,?,?)",
[
admission_no,
first_name,
last_name,
gender,
stream_id
],
(err,result)=>{
if(err) return res.status(500).json(err);

res.json({
message:"Student Added successfully"
});
});
});


router.get("/", (req, res) => {
db.query("SELECT * FROM students", (err, result) => {
if(err) return res.status(500).json(err);
res.json(result);
});
});


router.get("/:id", (req, res) => {
const id = req.params.id;
db.query("SELECT * FROM students WHERE student_id = ?", [id], (err, result) => {
if(err) return res.status(500).json(err);
res.json(result[0]);
});
});

router.put("/:id", (req, res) => {
const id = req.params.id;
const {
admission_no,
first_name,
last_name,gender,
stream_id
} = req.body;
db.query(
"UPDATE students SET admission_no = ?, first_name = ?, last_name = ?, gender = ?, stream_id = ? WHERE id = ?",
[
admission_no,
first_name,
last_name
,gender,
stream_id,
id
],
(err, result) => {
if(err) return res.status(500).json(err);
res.json({
message: "Student Updated successfully"
});
});
});

router.delete("/:id", (req, res) => {
const id = req.params.id;
db.query("DELETE FROM students WHERE student_id = ?", [id], (err, result) => {
if(err) return res.status(500).json(err);
res.json({
message: "Student Deleted successfully"
});
});
});


module.exports = router;