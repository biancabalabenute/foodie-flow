import { createContext, ReactNode, useState } from 'react'

import { api } from '../services/apiClient'

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user; //converte em booleano

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })

            //console.log(response.data)

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, //expirar em um mês
                path: "/" //quais caminhos terão acesso ao cookie
            })

            setUser({
                id,
                name,
                email,
            })

            //passar para as proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //redirecionar o user para a pag dashboard
            Router.push('/dashboard')

        } catch (err) {
            console.log("ERRO AO ACESSAR")
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password,
            });

            console.log("CADASTRADO COM SUCESSO");
            Router.push('/'); // Redireciona para a página inicial após o cadastro bem-sucedido.
        } catch (err) {
            console.error("Erro ao cadastrar ", err);
        }
    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}