const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ---------------- CREATE STREAM ---------------- */
router.post("/", (req, res) => {
  const { stream_name } = req.body;

  db.query(
    "INSERT INTO streams(stream_name) VALUES(?)",
    [stream_name],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Stream Added successfully",
      });
    }
  );
});

/* ---------------- GET ALL STREAMS ---------------- */
router.get("/", (req, res) => {
  db.query("SELECT * FROM streams", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ---------------- GET ONE STREAM ---------------- */
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM streams WHERE stream_id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

/* ---------------- UPDATE STREAM ---------------- */
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { stream_name } = req.body;

  db.query(
    "UPDATE streams SET stream_name = ? WHERE stream_id = ?",
    [stream_name, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Stream Updated successfully",
      });
    }
  );
});

/* ---------------- DELETE STREAM ---------------- */
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM streams WHERE stream_id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Stream Deleted successfully",
      });
    }
  );
});

module.exports = router;