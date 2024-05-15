import { Outlet } from "react-router-dom";
import ToggleContent from "./ToggleContent";
import UserFooter from "./UserFooter";
import { ControllersProvider } from "./Context";
const PrivateView = () => {
  return (
    <>
      <ControllersProvider>
        <div className="bg-dark-subtle min-vh-100">
          <ToggleContent></ToggleContent>
          <Outlet />
        </div>
        <UserFooter></UserFooter>
      </ControllersProvider>
    </>
  );
};

export default PrivateView;
