import { toast } from "sonner";
import { supabase } from "../../supabase";
import { FcGoogle } from "react-icons/fc";

interface SocialAuthProps {
    isLogin: boolean;
}

const SocialAuth = ({isLogin}: SocialAuthProps) => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error){ 
      console.error("Google Auth Error:", error.message)
      toast.error(error.message);
    }
    else {
      console.log("Google Auth initiated");
      toast.success('Logged in successfully!');
    }
  };

  return (
    <div className='mt-4 w-full'>
        <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-neutral-200"></div>
            <span className="flex-shrink-0 px-3 text-neutral-400 text-[10px] font-semibold uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-neutral-200"></div>
        </div>
        <button 
            type="button"
            onClick={handleGoogleLogin}
            className='flex items-center justify-center mt-3 py-2.5 gap-2 w-full border border-neutral-200 bg-white hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer text-sm font-medium text-brand-primary-dark'>
            <FcGoogle size={18}/>
            {isLogin? 'Log in with Google' : 'Sign up with Google'}
        </button>
    </div>
  );
};

export default SocialAuth;
