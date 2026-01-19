const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("./middleware/auth");

router.get("/", verifyToken, (req, res) => {
    const isoDate = req.query.date;
    const dateOnly = isoDate.split("T")[0];

    db.query(
        "SELECT * FROM appointments WHERE DATE = ?",
        [dateOnly],
        (err, results) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json(results);
        }
    );
});

module.exports = router;