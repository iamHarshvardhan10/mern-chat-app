// import { HOST } from "../../constant/constant";
import { FaEdit, FaPowerOff } from "react-icons/fa";
import { useAppStore } from "../../stores";
// import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/apiClient";
import { LOGOUT_ROUTE } from "../../constant/constant";
// import { Avatar, AvatarImage } from "../ui/avatar";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#11b2]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-18 h-12 relative flex items-center justify-center">
          {userInfo.image ? (
            <div>
              {userInfo.firstName && userInfo.lastName
                ? `${userInfo.firstName} ${userInfo.lastName}`
                : userInfo.email}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex items-center justify-between gap-5">
        <TooltipProvider className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <FaEdit
                  className="text-green-500 font-medium text-lg"
                  onClick={() => navigate("/profile")}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <FaPowerOff
                  className="text-red-500 font-medium text-lg"
                  onClick={handleLogout}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
