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
interface SignupForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
const SignUp = ({isLogin, setIsLogin}: LoginProps) => {

    const [signupForm, setSignupForm] = useState<SignupForm>({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    

    const handleSignup = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
// create new user in supabase auth system(not in db) with email,pass
        const { data, error: authError } = await supabase.auth.signUp({
            email: signupForm.email, 
            password: signupForm.password
        })

        setLoading(false)
        if(authError){
            alert(authError.message)
            toast.error(authError.message)
            return
        }else{
            navigate('/')
            toast.success('Signed up successfully!')
        }
//get user
        const user = data.user
        
        if (!user) return;
//after successfully creating the user. create an userInfo row for that user with his other info in db table
        const {error: profileInsertError} = await supabase.from('profiles').insert([
            {
                id: user.id,
                first_name: signupForm.firstName,
                last_name: signupForm.lastName,
                full_name: signupForm.firstName +" "+ signupForm.lastName,
            }
        ])

        if(profileInsertError){
            console.error("Profile insert error:", profileInsertError.message);
        } else {
            console.log("Signup successful!");
        }

        window.location.reload()

    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSignupForm((prev) => ({
            ...prev,
            [e.target.name] : e.target.value 
        }))
    }

  return (
    <div className='w-full max-w-sm mx-auto flex flex-col justify-center items-center bg-white p-6 sm:p-8 border border-neutral-200 rounded-2xl shadow-sm'>
        <div className="text-center mb-6">
            <h2 className='text-2xl font-bold text-brand-primary-dark'>Create Account</h2>
            <p className="text-neutral-500 mt-1 text-xs">Join us to start your green journey.</p>
        </div>

        <form onSubmit={handleSignup} className='w-full flex flex-col gap-3'>
            <input
                className='w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                type="text" 
                placeholder='First Name'
                onChange={handleFormChange}
                name='firstName'
                value={signupForm.firstName}
                required
            />
            <input
                className='w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                type="text" 
                placeholder='Last Name'
                onChange={handleFormChange}
                name='lastName'
                value={signupForm.lastName}
                required
            />
            <input
                className='w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                type="email" 
                placeholder='Email Address'
                onChange={handleFormChange}
                name='email'
                value={signupForm.email}
                required
            />
            <input
                className='w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                type="password" 
                placeholder='Password'
                onChange={handleFormChange}
                name='password'
                value={signupForm.password}
                required
            />
            <button 
                className='w-full py-2.5 mt-2 bg-brand-primary hover:bg-brand-primary-dark transition-colors text-white rounded-lg font-semibold text-sm cursor-pointer'
                type='submit'
                disabled={loading}
            >{loading? "Signing Up...": "Sign Up"}
            </button>

            <SocialAuth isLogin={isLogin}/>

            <p className='text-xs text-neutral-500 text-center mt-2'>
                Already have an account? 
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className='text-brand-primary hover:text-brand-primary-dark font-semibold cursor-pointer ml-1 transition-colors'>
                        Log in
                </button>
            </p>

        </form>
    </div>
  )
}

export default SignUp