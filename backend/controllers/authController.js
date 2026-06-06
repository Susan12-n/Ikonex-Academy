const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register User
exports.register = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        // Check existing user
        const [existing] = await db.promise().query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await db.promise().query(
            `INSERT INTO users
            (fullname,email,password,role)
            VALUES(?,?,?,?)`,
            [
                fullname,
                email,
                hashedPassword,
                role || "teacher"
            ]
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Login User
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const [users] = await db.promise().query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const user = users[0];

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user.user_id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.user_id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

