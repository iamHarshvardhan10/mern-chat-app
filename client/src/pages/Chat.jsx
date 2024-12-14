import { useNavigate } from "react-router-dom";
import { useAppStore } from "../stores";
import { useEffect } from "react";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return <div>Chat</div>;
};

export default Chat;
