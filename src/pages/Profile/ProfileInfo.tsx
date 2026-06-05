import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { useAuth } from "../../AuthContext";
import { toast } from "sonner";
import Spinner from "../../components/Spinner";

const ProfileInfo = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (!error && data) {
        setFullName(data.full_name || "");
      } else {
        setFullName(user.user_metadata?.full_name || "");
      }
      setAvatarUrl(user.user_metadata?.avatar_url || "");
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    let finalAvatarUrl = avatarUrl;
    
    if (imageFile) {
      const fileName = `${user.id}-${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from("avatars").upload(fileName, imageFile);
      
      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);
        finalAvatarUrl = urlData.publicUrl;
      } else {
        console.error("Image upload error:", uploadError);
        toast.error("Image upload failed. Name will still be saved.");
      }
    }

    // Extract first and last name to satisfy database constraints
    const names = fullName.trim().split(" ");
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ") || "";

    // Upsert will CREATE the row if it doesn't exist, or UPDATE it if it does
    const { error } = await supabase.from("profiles").upsert({ 
      id: user.id, 
      full_name: fullName, 
      first_name: firstName,
      last_name: lastName
    });
    
    if (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Check console for details.");
    } else { 
      // Update global Auth session metadata so Navbar updates instantly
      await supabase.auth.updateUser({ data: { full_name: fullName, avatar_url: finalAvatarUrl }});
      toast.success("Profile updated successfully!"); 
      setAvatarUrl(finalAvatarUrl); 
      setImageFile(null); 
    }
    
    setSaving(false);
  };

  if (loading) return <div className="h-40 flex items-center justify-center"><Spinner /></div>;

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-brand-primary-dark tracking-tight mb-6">Personal Information</h2>
      <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-sm">

        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
            {imageFile ? (
              <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
            ) : avatarUrl || user?.user_metadata?.avatar_url ? (
              <img src={avatarUrl || user?.user_metadata?.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest text-center leading-tight">No<br/>Image</span>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Profile Picture</label>
            {user?.app_metadata?.provider === 'email' ? (
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="text-[10px] text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 transition-all cursor-pointer w-full" />
            ) : (
              <p className="text-[10px] text-neutral-400 mt-1.5">Your profile picture is managed by {user?.app_metadata?.provider === 'google' ? 'Google' : 'your login provider'}.</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Email Address (Read Only)</label>
          <input type="email" disabled value={user?.email || ""} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-400 cursor-not-allowed" />
          <p className="text-[10px] text-neutral-400 mt-1.5">Your email address is used for login and cannot be changed here.</p>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Full Name</label>
          <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className="w-full p-3 bg-white border border-neutral-200 rounded-lg text-xs focus:outline-brand-primary text-brand-primary-dark transition-all shadow-sm" />
        </div>
        <button type="submit" disabled={saving} className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-sm hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 mt-2 w-full sm:w-max">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
