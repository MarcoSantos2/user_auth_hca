import {createContext, useContext, useState} from 'react';
import * as React from 'react';

interface LoginUser {
    email: string,
    token: string,
    name: string,
}

interface ProviderProps {
    email: string,
    token: string,
    name: string,
    isLogin(): boolean,
    login(data: LoginUser): void,
    logout(): void,
}

const AuthContext = createContext<ProviderProps>({
    email: '',
    token: '', 
    name: '', 
    isLogin(): boolean {return false;},
    login: () => {},
    logout: () => {}
})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
    const [email, setEmail] = useState<string>(storedInfo?.email || '')
    const [token, setToken] = useState<string>(storedInfo?.token || '')
    const [name, setName] = useState<string>(storedInfo?.name || '')

    const login = (data: LoginUser) => {
        setTimeout(() => {
            setEmail(data.email)
            setToken(data.token)
            setName(data.name)
            localStorage.setItem('user', JSON.stringify({email: data.email, token: data.token, name: data.name}))
        }, 1000);
    }

    const logout = () => {
        setEmail('')
        setToken('')
        setName('')
        localStorage.removeItem('user')
    }

    const isLogin = () => {
        return token !== '';
    }

    return (
        <AuthContext.Provider value={{email, token, name, login, logout, isLogin}}>
            {children}
        </AuthContext.Provider>
    );
}
