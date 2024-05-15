import { Outlet } from "react-router-dom";
import ToggleContent from "./ToggleContent";
import UserFooter from "./UserFooter";
import { ControllersProvider } from "./Context";

const PublicView = () => {
  return (
    <>
      <ControllersProvider>
        <div className="bg-dark-subtle min-vh-100 pb-5">
          <ToggleContent></ToggleContent>
          <Outlet />
        </div>
        <UserFooter></UserFooter>
      </ControllersProvider>
    </>
  );
};

export default PublicView;
