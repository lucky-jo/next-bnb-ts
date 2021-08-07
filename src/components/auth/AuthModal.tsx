import React from "react";
import SignUpModal from "./SignUpModal";
import { useSelector } from "../../../store";

interface IProps {
  closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state) => state.auth.authMode);

  return (
    <div>
      {authMode === "signup" && (
        <SignUpModal closeModal={closeModal}></SignUpModal>
      )}
      {authMode === "login" && <div>로그인</div>}
    </div>
  );
};

export default AuthModal;
