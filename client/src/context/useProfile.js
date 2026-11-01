import { useContext } from "react";
import ProfileContext from "./ProfileContext";

export const useProfile = (role = "student") => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  if (role === "admin") {
    return {
      profile: context.adminProfile,
      setProfile: context.setAdminProfile,
      profileImage: context.adminProfileImage,
      setProfileImage: context.setAdminProfileImage,
    };
  }

  return {
    profile: context.studentProfile,
    setProfile: context.setStudentProfile,
    profileImage: context.studentProfileImage,
    setProfileImage: context.setStudentProfileImage,
  };
};