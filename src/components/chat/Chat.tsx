import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const Chat = () => {
  return (
    <>
      <Accordion type="single" collapsible className="relative z-[9999] ">
        <AccordionItem value="item-1">
          <div className="fixed right-8 w-80 bottom-8  border border-white rounded-md overflow-hidden ">
            <div className="w-full h-full flex flex-col top-0 bg-black/75 bg-opacity-50 backdrop-filter backdrop-blur-md shadow-2xl">
              <AccordionTrigger className="px-6 border-b">
                <ChatHeader />
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col h-80">
                  <ChatMessages className="px-2 py-3 flex-1" />
                  <ChatInput className="px-4" />
                </div>
              </AccordionContent>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Chat;
