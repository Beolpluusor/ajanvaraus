

export default function Home () {

    const handleLogout = () => {
        localStorage.removeItem("token", response.data.token)
        Navigate("/");
    }


    return (
        <div>
            kotisivu

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}