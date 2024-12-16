import { FaPlus } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie-json.json";
import axiosInstance from "../../utils/apiClient";
import { SEARCH_CONTACTS_ROUTE } from "../../constant/constant";
import { ScrollArea } from "../ui/scroll-area";
import { useAppStore } from "../../stores";
const NewDm = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchContacts, setSearchContacts] = useState([]);
  console.log(searchContacts);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleseachContact = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const res = await axiosInstance.post(
          SEARCH_CONTACTS_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );
        if (res.status === 200 && res.data.contacts) {
          setSearchContacts(res.data.contacts);
        } else {
          setSearchContacts([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchContacts([]);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#1c1b1e] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please Select Your Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => handleseachContact(e.target.value)}
            />
          </div>

          {searchContacts && searchContacts.length > 0 ? (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchContacts.map((contact) => {
                  return (
                    <div
                      key={contact._id}
                      className="flex gap-3 items-center cursor-pointer"
                      onClick={() => selectNewContact(contact)}
                    >
                      {/* changes from profile Info like avatar will come here */}
                      <div className="flex-1">{contact.email}</div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-1000 transition-all p-3 rounded-lg">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={defaultOptions}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-2xl text-3xl transition-all duration-300 text-center">
                <h3 className="font-serif font-medium">
                  Hi <span className="text-purple-500">! </span> Search{" "}
                  <span className="text-purple-500">New Contact </span> On App
                  <span className="text-purple-500">.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
