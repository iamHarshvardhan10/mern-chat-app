import { useNavigate } from "react-router-dom";
import { useAppStore } from "../stores";
import { useEffect } from "react";
import { toast } from "sonner";
import ContactContainer from "../components/chat/ContactContainer";
import EmptyContainer from "../components/chat/EmptyContainer";
import ChatContainer from "../components/chat/ChatContainer";

const Chat = () => {
  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  console.log("UserINFO", userInfo);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer />

      {selectedChatType === undefined ? <EmptyContainer /> : <ChatContainer />}
      {/* */}
    </div>
  );
};

export default Chat;
