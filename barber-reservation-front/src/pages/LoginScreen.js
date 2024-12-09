import React  , {useState} from "react";

import LoginFormComponent from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm.jsx";

const LoginView = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <main className="flex h-screen w-screen bg-slate-100">
      {!isLogin ? (
        <LoginFormComponent toggleView={toggleView} />
      ) : (
        <SignUpForm toggleView={toggleView} />
      )}
    </main>
  );
};

export default LoginView;
