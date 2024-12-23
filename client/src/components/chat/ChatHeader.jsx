import { useAppStore } from "../../stores";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  console.log(selectedChatData);
  return (
    <div className="h-[10vh] bordeer-b-2 border-[#2f303b] flex items-center justify-center px-20">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 itece justify-center">
          {selectedChatType === "channel" && (
            <div>{selectedChatData?.name}</div>
          )}
          {selectedChatType === "contact" && (
            <div>{selectedChatData?.firstName}</div>
          )}
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
