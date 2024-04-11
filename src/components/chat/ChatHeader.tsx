const ChatHeader = () => {
  return (
    <div className="w-full flex gap-3 justify-start items-center text-white ">
      <div className="flex flex-col items-start text-sm">
        <p className="text-xs">Chatear con</p>
        <div className="flex gap-1.5 items-center">
          <p className="w-3 h-3 rounded-full bg-green-500   " />
          <p className="font-medium">Soporte de Bitbuddy</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
