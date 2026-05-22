import { useState } from 'react'
import SignUp from './SignUp'
import LogIn from './LogIn'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div>
      {isLogin ? 
        <LogIn 
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        /> : 
        <SignUp 
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      }
    </div>
  )
}

export default AuthForm