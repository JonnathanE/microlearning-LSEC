import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('jwt')) || null);

    const contextValue = {
        user,
        login(jwt) {
            setUser(jwt)
        },
        logout() {
            localStorage.removeItem('jwt');
            setUser(null);
        },
        isLogged() {
            return !!user;
        }
    }

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;