import ChatHeader from "./ChatHeader";
import Messagebar from "./Messagebar";
import MessageContainer from "./MessageContainer";

const ChatContainer = () => {
  return (
    <div className="fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1">
      <ChatHeader />
      <MessageContainer />
      <Messagebar />
    </div>
  );
};

export default ChatContainer;