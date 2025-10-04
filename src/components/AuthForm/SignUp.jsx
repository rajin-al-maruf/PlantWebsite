import { useState } from 'react'
import {supabase} from '../../supabase'
import {useNavigate} from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import SocialAuth from './SocialAuth'

const SignUp = ({isLogin, setIsLogin}) => {

    const [signupForm, setSignupForm] = useState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    

    const handleSignup = async (e) => {
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
            return
        }
//get user
        const user = data.user
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

    const handleFormChange = (e) => {
        setSignupForm((prev) => ({
            ...prev,
            [e.target.name] : e.target.value 
        }))
    }

  return (
    <div className='max-w-sm mx-auto flex flex-col justifu-center items-center bg-white px-8 py-12 rounded-lg shadow-lg'>
        <h2 className='text-xl font-medium'>Create An Account</h2>

        <form onSubmit={handleSignup} className='w-full flex flex-col items-center justify-center gap-4 mt-8'>

            <input
                className='border border-neutral-300 px-4 py-2  text-xs focus:outline-none focus:border-brand-primary w-full'
                type="text" 
                placeholder='First Name'
                onChange={handleFormChange}
                name='firstName'
                value={signupForm.firstName}
            />
            <input
                className='border border-neutral-300 px-4 py-2  text-xs focus:outline-none focus:border-brand-primary w-full'
                type="text" 
                placeholder='Last Name'
                onChange={handleFormChange}
                name='lastName'
                value={signupForm.lastName}
            />
            <input
                className='border border-neutral-300 px-4 py-2  text-xs focus:outline-none focus:border-brand-primary w-full'
                type="email" 
                placeholder='Email'
                onChange={handleFormChange}
                name='email'
                value={signupForm.email}
            />
            <input
                className='border border-neutral-300 px-4 py-2 text-xs focus:outline-none focus:border-brand-primary w-full'
                type="password" 
                placeholder='Password'
                onChange={handleFormChange}
                name='password'
                value={signupForm.password}
            />
            <button 
                className='bg-black hover:bg-brand-primary text-white px-4 py-2 text-sm transition-colors cursor-pointer w-full'
                type='submit'
            >{loading? "Signing Up...": "Sign Up"}
            </button>

            <SocialAuth isLogin={isLogin}/>

            <p className='text-xs text-neutral-600'>Already have an account? 
                <span
                    onClick={() => setIsLogin(!isLogin)}
                    className='text-black hover:text-brand-primary cursor-pointer ml-1'>
                        Log in
                </span>
            </p>

        </form>
    </div>
  )
}

export default SignUp