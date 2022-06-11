import { useState, createContext, useContext } from "react";
import { useJwt } from "react-jwt";
const AuthContext = createContext(null)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const { decodedToken, isExpired } = useJwt(user);
    const login = (user) => {
        // useJwt(user)
        console.log(user, "tokennnnnnnn");
        setUser(user)
    }
    const logout = () => {
        setUser(null)
    }
    return (
    <AuthContext.Provider value={{user, login, logout}}>
        {children}</AuthContext.Provider>)
}
export const useAuth = () => {
    return useContext(AuthContext)
}