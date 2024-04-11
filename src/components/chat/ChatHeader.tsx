"use client";

export default function ChatHeader() {
  return (
    <div className="w-full flex gap-3 justify-start items-center pb-2">
      <div className="flex flex-col items-start text-sm">
        <div className="flex gap-1.5 items-center">
          <img
            src="./botProfile.png"
            alt="chat bot"
            className="w-[40px] h-[40px]"
            loading="lazy"
          />
          <p className="w-3 h-3 rounded-full bg-green-500" />
          <p className="font-medium">Soporte de Bitbuddy</p>
        </div>
      </div>
    </div>
  );
}
