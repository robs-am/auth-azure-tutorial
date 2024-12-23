import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package 
 */

type LoginType = "popup" | "redirect";

export const SignInButton: React.FC = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: LoginType) => {
    console.log(`[SignInButton] Login initiated with type: ${loginType}`);
    console.log("[SignInButton] Current loginRequest:", loginRequest);

    if (loginType === "popup") {
      instance
        .loginPopup(loginRequest)
        .then((response) => {
          console.log("[SignInButton] Popup Login Successful:", response);
        })
        .catch((error) => {
          console.error("[SignInButton] Popup Login Error:", error);
        });
    } else if (loginType === "redirect") {
      instance
        .loginRedirect(loginRequest)
        .then(() => {
          console.log("[SignInButton] Redirect Login Triggered. Awaiting response...");
        })
        .catch((error) => {
          console.error("[SignInButton] Redirect Login Error:", error);
        });
    }
  };

  return (
    <DropdownButton
      variant="secondary"
      className="ml-auto"
      drop="start"
      title="Sign In"
    >
      <Dropdown.Item as="button" onClick={() => handleLogin("popup")}>
        Sign in using Popup
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => handleLogin("redirect")}>
        Sign in using Redirect
      </Dropdown.Item>
    </DropdownButton>
  );
};
