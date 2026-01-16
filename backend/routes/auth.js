const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (username, password_hash) VALUES (?, ?)",
        [username, hash],
        (err) => {
            if (err) return res.json({ status: "error", error: err});
            res.json({status: "ok" });
        }
    );
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT FROM users WHERE username = ?",
        [username],
        async (err, results) => {
            if (err || results.length === 0)
                return res.json({ status: "error", error: "User not found"});

            const user = results[0];
            const match = await.bcrypt.compare(password, user.password_hash);

            if (!match) return res.json({ status: "error", error: "Wrong password"});

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

            res.json({ status: "ok", token });
        }
    );
});

module.exports = router;