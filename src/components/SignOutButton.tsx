import { useMsal } from "@azure/msal-react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * Renders a sign out button 
 */

type LogoutType = "popup" | "redirect";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType: LogoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <DropdownButton id="dropdown-basic-button" title="Sign Out">
      <Dropdown.Item onClick={() => handleLogout("popup")}>Sign out using Popup</Dropdown.Item>
      <Dropdown.Item onClick={() => handleLogout("redirect")}>Sign out using Redirect</Dropdown.Item>
    </DropdownButton>
  );
};