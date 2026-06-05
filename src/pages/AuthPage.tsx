import AuthForm from '../components/AuthForm/AuthForm'

const AuthPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center mt-24 md:mt-32 mb-20 px-4 md:px-6">
      <div className='w-full max-w-6xl 2xl:max-w-7xl mx-auto'>
          <AuthForm />
      </div>
    </div>
  )
}

export default AuthPage