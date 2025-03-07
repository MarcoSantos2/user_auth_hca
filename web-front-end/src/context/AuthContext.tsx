import {createContext, useContext, useState} from 'react';
import * as React from 'react';

interface LoginUser {
    name: string,
    email: string,
    picture_url: string,
    token: string,
}

interface ProviderProps {
    name: string,
    email: string,
    picture_url: string,
    token: string,
    isLogin(): boolean,
    login(data: LoginUser): void,
    logout(): void,
}

const AuthContext = createContext<ProviderProps>({
    name: '', 
    email: '',
    picture_url: '',
    token: '', 
    isLogin(): boolean {return false;},
    login: () => {},
    logout: () => {}
})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
    const [name, setName] = useState<string>(storedInfo?.name || '')
    const [email, setEmail] = useState<string>(storedInfo?.email || '')
    const [picture_url, setPictureUrl] = useState<string>(storedInfo?.picture_url || '')
    const [token, setToken] = useState<string>(storedInfo?.token || '')

    const login = (data: LoginUser) => {
        setTimeout(() => {
            setName(data.name)
            setEmail(data.email)
            setPictureUrl(data.picture_url || '')
            setToken(data.token)
            localStorage.setItem('user', JSON.stringify({name: data.name, email: data.email, picture_url: data.picture_url, token: data.token}))
        }, 1000);
    }

    const logout = () => {
        setName('')
        setEmail('')
        setPictureUrl('')
        setToken('')
        localStorage.removeItem('user')
    }

    const isLogin = () => {
        return token !== '';
    }

    return (
        <AuthContext.Provider value={{name, email, picture_url, token, login, logout, isLogin}}>
            {children}
        </AuthContext.Provider>
    );
}
