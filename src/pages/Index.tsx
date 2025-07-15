
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "@/components/Login";
import Register from "@/components/Register";

const Index = () => {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (userData: any) => {
    navigate("/dashboard");
  };

  const handleRegister = (userData: any) => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {showRegister ? (
        <Register 
          onRegister={handleRegister}
          switchToLogin={() => setShowRegister(false)}
        />
      ) : (
        <Login 
          onLogin={handleLogin}
          switchToRegister={() => setShowRegister(true)}
        />
      )}
    </div>
  );
};

export default Index;
