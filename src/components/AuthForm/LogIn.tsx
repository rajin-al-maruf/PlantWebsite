import { useState } from 'react'
import {supabase} from '../../supabase'
import {useNavigate} from 'react-router-dom'
import SocialAuth from './SocialAuth'
import { toast } from 'sonner'
import type { Dispatch, SetStateAction, ChangeEvent, SubmitEvent } from 'react'

interface LoginProps {
    isLogin: boolean;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}
interface loginForm {
    email: string;
    password: string;
}

const LogIn = ({isLogin, setIsLogin}: LoginProps) => {

    const [loginForm, setLoginForm] = useState<loginForm>({
            email: '',
            password: '',
        })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    console.log(loginForm)

    const handleSignup = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
//check the email,pass from supabase auth system
        const {error} = await supabase.auth.signInWithPassword({
            email: loginForm.email, 
            password: loginForm.password
        })

        setLoading(false)
        if(error){
            toast.error(error.message)
        }else{
            navigate('/')
            toast.success('Logged in successfully!')
        }

        
    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [e.target.name] : e.target.value 
        }))
    }

  return (
    <div className='w-full max-w-sm mx-auto flex flex-col justify-center items-center bg-white p-6 sm:p-8 border border-neutral-200 rounded-2xl shadow-sm'>
        <div className="text-center mb-6">
            <h2 className='text-2xl font-bold text-brand-primary-dark'>Welcome Back</h2>
            <p className="text-neutral-500 mt-1 text-xs">Log in to access your account.</p>
        </div>

        <form onSubmit={handleSignup} className='w-full flex flex-col gap-3'>
            <input
                className='w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                type="email" 
                placeholder='Email Address'
                onChange={handleFormChange}
                name='email'
                value={loginForm.email}
                required
            />
            <input
                className='w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                type="password" 
                placeholder='Password'
                onChange={handleFormChange}
                name='password'
                value={loginForm.password}
                required
            />
            <button 
                className='w-full py-2.5 mt-2 bg-brand-primary hover:bg-brand-primary-dark transition-colors text-white rounded-lg font-semibold text-sm cursor-pointer'
                type='submit'
                disabled={loading}
            >{loading? "Logging in...": "Login"}
            </button>

            <SocialAuth isLogin={isLogin}/>

            <p className='text-xs text-neutral-500 text-center mt-2'>
                Don't have an account? 
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className='text-brand-primary hover:text-brand-primary-dark font-semibold cursor-pointer ml-1 transition-colors'>
                        Sign Up
                </button>
            </p>
        </form>
    </div>
  )
}

export default LogIn