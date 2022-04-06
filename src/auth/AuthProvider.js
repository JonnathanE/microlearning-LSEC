import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('auth')) || null)

    const contextValue = {
        user,
        login(user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user)
        },
        logout() {
            localStorage.removeItem('user');
            localStorage.removeItem('auth');
            setAdmin(null);
            setUser(null);
        },
        isLogged() {
            return !!user;
        },
        role(rol) {
            localStorage.setItem('auth', JSON.stringify(rol));
            setAdmin(rol);
        },
        isAdmin() {
            return !!admin;
        }
    }

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;