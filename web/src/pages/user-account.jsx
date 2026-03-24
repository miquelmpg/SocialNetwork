import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserProfile } from "../components/users";
import { useAuth } from '../contexts/auth-context';
import * as ApiService from '../services/api-service';

function UserAccount() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const { id } = useParams();
    
    async function deleteAccount(id) {
        confirm(`You are going to delete your account. Are you sure?`);
        await ApiService.deleteProfile(currentUser.id);
        navigate('/register')
    }

    useEffect(() => {
        async function getUserProfile() {
            const detailUser = await ApiService.getProfile(currentUser.id);
            setUser(detailUser);
        }
        getUserProfile();
    }, []);

    return (
        <>
            <div className='w-75'>
                {user && <UserProfile {...user} />}
                {currentUser.id && <div className="fa fa-trash " style={{ width: '35px', height: 'auto'}} onClick={() => deleteAccount()}></div>}
            </div>
        </>
    );
}

export default UserAccount;