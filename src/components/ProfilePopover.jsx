import { useState, useEffect, useRef, use } from "react";
import { supabase } from "../supabase";
import { CiUser } from "react-icons/ci";
import { PiSpinner } from "react-icons/pi";
import useClickOutside from "../hooks/useClickOutside";
import { toast } from "sonner";

const ProfilePopover = ({ user, showPopover, setShowPopover }) => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true)

  const popoverRef = useRef(null);

  useClickOutside(popoverRef, () => {
    setShowPopover(false);
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single()

      if (error) console.log(error.message)
        else{
          setProfile(data)
        }
      setLoading(false)
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
    toast.success("Logged out successfully");
  };

  console.log(profile)

  return (
    <div ref={popoverRef} className="absolute right-0 left top-20 bg-white shadow-lg rounded-md p-4 z-50">
        <div>
          {loading? 
          <PiSpinner/> :
          <div className="flex flex-col gap-4 items-center justify-center">
            <button className='h-8 md:w-16 w-8 md:h-16 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
              <CiUser size={30}/>
            </button>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs font-medium">{profile?.full_name}</p>
              <p className="text-[10px] font-light">{user.email}</p>
              <button
                onClick={handleLogout}
                className="w-full text-xs text-white bg-red-400 hover:bg-red-600 mt-4 p-2 rounded-md cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        }
          
        </div>
    </div>
    
  );
};

export default ProfilePopover;
