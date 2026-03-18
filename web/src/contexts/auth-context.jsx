import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ApiService from '../services/api-service';

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function userFetch() {
            try {
                const user = await ApiService.getProfile();
                setUser(user);
            } catch (error) {
                navigate('/login');
            }
        }

        userFetch();
    }, []);

    async function userLogin(email, password) {
        const user = await ApiService.login(email, password);
        setUser(user);
    }

    async function userLogout() {
        await ApiService.logout();
        setUser(null);
    }

    if (
        user === null &&
        location.pathname !== '/login' &&
        location.pathname !== '/register'
    ) {
        return <></>
    }

    return (
        <AuthContext.Provider value={{ user, userLogin, userLogout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}