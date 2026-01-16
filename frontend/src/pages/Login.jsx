import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
                username,
                password
            });

            if (response.data.status == "ok") {
                localStorage.setItem("token", response.data.token);
                alert("Login successful");
                navigate("/home");
            }
            if (response.data.status === "error") {
                alert("Login failed: " + response.data.error);
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            alert("Error in server");
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                type="text"
                placeholder="Username"
                maxlength={20}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

            <input
                type="password"
                placeholder="Password"
                maxLength={20}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

            <button onClick={handleLogin}>Login</button>
            <p>new user? then click the register button to use calendar</p>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
    );
}