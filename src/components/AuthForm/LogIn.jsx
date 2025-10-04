import { useState } from 'react'
import {supabase} from '../../supabase'
import {useNavigate} from 'react-router-dom'
import SocialAuth from './SocialAuth'

const LogIn = ({isLogin, setIsLogin}) => {

    const [loginForm, setLoginForm] = useState({
            email: '',
            password: '',
        })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    console.log(loginForm)

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
//check the email,pass from supabase auth system
        const {error} = await supabase.auth.signInWithPassword({
            email: loginForm.email, 
            password: loginForm.password
        })

        setLoading(false)
        if(error){
            alert(error.message)
        }else{
            navigate('/')
        }

        
    }

    const handleFormChange = (e) => {
        setLoginForm((prev) => ({
            ...prev,
            [e.target.name] : e.target.value 
        }))
    }

  return (
    <div className='max-w-sm mx-auto flex flex-col justifu-center items-center bg-white px-8 py-12 rounded-lg shadow-lg'>
        <h2 className='text-xl font-medium'>Login</h2>

        <form onSubmit={handleSignup} className='w-full flex flex-col items-center justify-center gap-4 mt-8'>
            <input
                className='border border-neutral-300 px-4 py-2  text-xs focus:outline-none focus:border-brand-primary w-full'
                type="email" 
                placeholder='Email'
                onChange={handleFormChange}
                name='email'
                value={loginForm.email}
            />
            <input
                className='border border-neutral-300 px-4 py-2 text-xs focus:outline-none focus:border-brand-primary w-full'
                type="password" 
                placeholder='Password'
                onChange={handleFormChange}
                name='password'
                value={loginForm.password}
            />
            <button 
                className='bg-black hover:bg-brand-primary text-white px-4 py-2 text-sm transition-colors cursor-pointer w-full'
                type='submit'
            >{loading? "Logging in...": "Login"}
            </button>

            <SocialAuth isLogin={isLogin}/>

            <p className='text-xs text-neutral-600'>Already have an account? 
                <span
                    onClick={() => setIsLogin(!isLogin)}
                    className='text-black hover:text-brand-primary cursor-pointer ml-1'>
                        Sign Up
                </span>
            </p>
        </form>
    </div>
  )
}

export default LogIn