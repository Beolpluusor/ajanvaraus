const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");



// Middleware token check
function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.json({ status: "error", error: "No token" });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.json({ status: "error", error: "Invalid token" });
    }
}

// get daily appointments
router.get("/", auth, (req, res) => {
    const { date } = req.query;

    db.query(
        "SELECT * FROM appointments WHERE user_id = AND date = ? ORDER BY start_time",
        [req.user.id, date],
        (err, results) => {
            if (err) return res.json({ status: "error", error: err });
            res.json({ status: "ok", appointments: results });
        }
    );
});

module.exports = router;

