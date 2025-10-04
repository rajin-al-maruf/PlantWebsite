import { supabase } from "../../supabase";
import { FcGoogle } from "react-icons/fc";

const SocialAuth = ({isLogin}) => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) console.error("Google Auth Error:", error.message);
  };

  return (
    <div className='mt-6 text-center border-t border-t-neutral-300 w-full relative'>
        <p className='bg-white px-4 text-neutral-600 text-xs absolute -top-2 left-1/2 -translate-x-1/2'>
            OR
        </p>
        <div 
            onClick={handleGoogleLogin}
            className='flex items-center justify-center mt-6 py-2 gap-2 w-full border border-neutral-300 hover:bg-neutral-100 cursor-pointer'>
            <FcGoogle size={20}/>
            <p className='text-xs'>{isLogin? 'Login with Google' : 'Sign Up with Google'}</p>
        </div>
    </div>
  );
};

export default SocialAuth;
