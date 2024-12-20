import { useAppStore } from "../../stores";

const ContactsList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatType,
    selectedChatData,
    setSelectedChatType,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };
  console.log("Contacts", contacts);
  return (
    <div className="mt-5">
      {contacts.map((contact) => {
        return (
          <div
            key={contact._id}
            className={`pl-10 transition-all duration-100 cursor-pointer ${
              selectedChatData & (selectedChatData?._id === contact?._id)
                ? "bg-[#8417ff] hover:bg-[#841744]"
                : "hover:bg-[#f1f1f111]"
            }`}
            onClick={() => handleClick(contact)}
          >
            <div>{contact.firstName}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactsList;
