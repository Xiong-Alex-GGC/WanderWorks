import { useAuth } from "../context/authContext"

const Dashboard = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in 
        </div>
    )
}

export default Dashboard;