import ProfileNavbar from "./ProfileNavbar";
import { ControllersProvider } from "./Context";
import EditProfileModal from "./EditProfileModal";
import UserData from "./UserData";
const UserProfile = () => {
  return (
    <>
      <ControllersProvider>
        <ProfileNavbar></ProfileNavbar>
        <UserData></UserData>
        <EditProfileModal></EditProfileModal>
      </ControllersProvider>
    </>
  );
};

export default UserProfile;
