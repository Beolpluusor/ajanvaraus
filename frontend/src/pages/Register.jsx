import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register () {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const createdAt = new Date().toISOString();
    
    const handleRegister = async () => {
        
        try {
            const response = await axios.post("http://localhost:5000/auth/register", {
                username,
                password,
                createdAt

            });
            if (response.data.status === "ok") {
                alert("New user created");
                navigate("/Home");
            }
            if (response.data.status === "error") {
                alert("Registration failed: " + response.data.error);
                navigate("/register");
            }
         
        } catch (err) {
            console.error(err);
            alert("Error in server");
        }
    };


    return (
        <div>
            <h2>fill the form</h2>
                <input
                    type="text"
                    placeholder="Username"
                    maxLength={20}
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
            <button onClick={handleRegister}>Register</button>
            <br />
            <button onClick={() => navigate("/")}>Back to Login</button>
        </div>
    )
}