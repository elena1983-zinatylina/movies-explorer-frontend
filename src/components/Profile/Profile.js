import  Header from "../Header/Header";
import  Main  from "../Main/Main";
import Preloader  from "../Preloader/Preloader";
import  ProfileForm  from "../ProfileForm/ProfileForm";

export default function Profile  ({
  logOut,
  isLoggedIn,
  updateUser,
  isLoading,
  profileChanged,
})  {
  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <Header isLoggedIn={isLoggedIn} color={"header_main"} />
      <Main>
        <ProfileForm
          logOut={logOut}
          updateUser={updateUser}
          profileChanged={profileChanged}
        />
      </Main>
    </>
  );
};