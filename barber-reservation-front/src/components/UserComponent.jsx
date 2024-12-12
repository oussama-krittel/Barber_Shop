import { FaUser } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function UserComponent({ user, expanded }) {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } else {
    }
  };

  return (
    <div className="border-t flex p-4">
      <FaUser size={28} className="text-gray-500" aria-label="User Icon" />
      <div
        className={`flex justify-between items-center overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        <div className="leading-4">
          <h4 className="font-semibold">
            {user?.lastname + " " + user?.firstname || "full name"}
          </h4>
          <span className="text-xs text-gray-600">
            {user?.email || "example@gmail.com"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

export default UserComponent;
