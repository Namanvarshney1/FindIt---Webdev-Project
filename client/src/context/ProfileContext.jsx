
import { useEffect, useState } from "react";
import { createContext } from "react";

const ProfileContext = createContext(null);

const defaultStudentProfile = {
  name: "Naman",
  studentId: "STU2026001",
  email: "naman@example.com",
  phone: "",
  department: "Computer Science",
  bio: "I am a student interested in technology and innovation.",
};

const defaultAdminProfile = {
  name: "Admin User",
  adminId: "ADM001",
  email: "admin@example.com",
  phone: "",
  department: "Administration",
  bio: "",
};

export const ProfileProvider = ({ children }) => {
  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("findit_student_profile");
      return saved
        ? { ...defaultStudentProfile, ...JSON.parse(saved) }
        : defaultStudentProfile;
    } catch {
      return defaultStudentProfile;
    }
  });

  const [studentProfileImage, setStudentProfileImage] = useState(
    () => localStorage.getItem("findit_student_profile_image") || null
  );

  const [adminProfile, setAdminProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("findit_admin_profile");
      return saved
        ? { ...defaultAdminProfile, ...JSON.parse(saved) }
        : defaultAdminProfile;
    } catch {
      return defaultAdminProfile;
    }
  });

  const [adminProfileImage, setAdminProfileImage] = useState(
    () => localStorage.getItem("findit_admin_profile_image") || null
  );

  useEffect(() => {
    localStorage.setItem(
      "findit_student_profile",
      JSON.stringify(studentProfile)
    );
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem(
      "findit_admin_profile",
      JSON.stringify(adminProfile)
    );
  }, [adminProfile]);

  useEffect(() => {
    if (studentProfileImage) {
      localStorage.setItem(
        "findit_student_profile_image",
        studentProfileImage
      );
    } else {
      localStorage.removeItem("findit_student_profile_image");
    }
  }, [studentProfileImage]);

  useEffect(() => {
    if (adminProfileImage) {
      localStorage.setItem(
        "findit_admin_profile_image",
        adminProfileImage
      );
    } else {
      localStorage.removeItem("findit_admin_profile_image");
    }
  }, [adminProfileImage]);

  return (
    <ProfileContext.Provider
      value={{
        studentProfile,
        setStudentProfile,
        studentProfileImage,
        setStudentProfileImage,
        adminProfile,
        setAdminProfile,
        adminProfileImage,
        setAdminProfileImage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
