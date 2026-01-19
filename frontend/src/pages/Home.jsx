import { useNavigate } from "react-router-dom";

export default function Home () {

    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }


    return (
        <div>
            kotisivu

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}