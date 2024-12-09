import { FaCut } from "react-icons/fa";
import { ChevronLast, ChevronFirst } from "lucide-react";

function LogoSection({ expanded, setExpanded }) {
  return (
    <div className="p-4 pb-2 flex justify-between items-center">
      <FaCut
        size={expanded ? 32 : 20}
        className={`transition-all text-indigo-500 ${
          expanded ? "ml-2" : "ml-0"
        }`}
        aria-label="Barbershop Logo"
      />
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
      >
        {expanded ? <ChevronFirst /> : <ChevronLast />}
      </button>
    </div>
  );
}

export default LogoSection;
