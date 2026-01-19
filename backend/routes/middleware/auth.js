const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1]; // "bearer TOKEN"

    if (!token) return res.status(401).json({ error: "Token missing" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "invalid token" });

        req.user = decoded; // like. { id: 1 }
        next();
    });
}

module.exports = verifyToken;