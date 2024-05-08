"use client";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { CloseSVG, SendSVG, WhatsappSVG } from "./assets/Icons";
import { reducer } from "./reducer";
import styles from "./styles/FloatingWhatsApp.module.css";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { FloatingWhatsAppProps } from "./model/floatingWa.model";

export function FloatingWhatsApp({
  onClick,
  onSubmit,
  onClose,
  onNotification,
  onLoopDone,

  accountName = "Consorcio A&C Eléctrica S.A.C",
  avatar = "./user_whatsapp.jpg",
  statusMessage,
  initialMessageByServer,
  placeholder = "Type a message..",

  messageDelay = 2,

  allowClickAway = false,
  allowEsc = false,

  notification = true,
  notificationDelay = 1800,
  notificationLoop = 0,
  notificationStyle,
  notificationClassName = "floating-whatsapp-notification",

  buttonStyle,
  buttonClassName = "floating-whatsapp-button",

  chatboxHeight = 320,
  chatboxStyle,
  chatboxClassName = "floating-whatsapp-chatbox",

  darkMode: darkModeProp,
  style,
  className = "floating-whatsapp",

  disponible,
}: FloatingWhatsAppProps) {
  const isDarkMode = useDarkMode();
  const [{ isOpen, isDelay, isNotification }, dispatch] = useReducer(reducer, {
    isOpen: false,
    isDelay: true,
    isNotification: false,
  });

  const timeNow = useMemo(
    () =>
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    []
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const notificationInterval = useRef(0);

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (isOpen) return;

      clearInterval(notificationInterval.current);
      dispatch({ type: "open" });
      setTimeout(() => dispatch({ type: "delay" }), messageDelay * 1000);
      if (onClick) onClick(event);
    },
    [isOpen, onClick, messageDelay]
  );

  const handleClose = useCallback(() => {
    dispatch({ type: "close" });

    if (onClose) onClose();
  }, [onClose]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputRef.current?.value) return;

    const encodedMessage = encodeURIComponent(inputRef.current.value.trim());
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_CLIENT_PHONE}&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    if (onSubmit) onSubmit(event, inputRef.current.value);
    inputRef.current.value = "";
  };

  useEffect(() => {
    const onClickOutside = () => {
      if (!allowClickAway || !isOpen) return;

      handleClose();
    };
    document.addEventListener("click", onClickOutside, false);

    return () => document.removeEventListener("click", onClickOutside);
  }, [allowClickAway, isOpen, handleClose]);

  useEffect(() => {
    const onEscKey = (event: KeyboardEvent) => {
      if (!allowEsc || !isOpen) return;

      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onEscKey, false);

    return () => document.removeEventListener("keydown", onEscKey);
  }, [allowEsc, isOpen, handleClose]);

  return (
    <div
      className={`${styles.floatingWhatsapp} ${
        isDarkMode ? `${styles.dark} ` : ""
      } ${className}`}
      style={style}
    >
      <div
        className={`${styles.whatsappButton} ${buttonClassName}`}
        onClick={handleOpen}
        style={buttonStyle}
        aria-hidden={!isOpen}
      >
        <WhatsappSVG />
        {!disponible ? null : (
          <>
            {isNotification && (
              <span
                className={`${styles.notificationIndicator} ${notificationClassName}`}
                style={notificationStyle}
              >
                1
              </span>
            )}
          </>
        )}
      </div>

      <div
        className={`${styles.whatsappChatBox} ${
          isOpen ? styles.open : styles.close
        } ${chatboxClassName}`}
        onClick={(event) => event.stopPropagation()}
        aria-hidden="true"
        style={{ height: isOpen ? chatboxHeight : 0, ...chatboxStyle }}
      >
        <header className={styles.chatHeader}>
          <div className="relative flex justify-end">
            <Avatar className=" aspect-1">
              <AvatarImage src={avatar} alt="Gerente General" />
              <AvatarFallback>PG</AvatarFallback>
            </Avatar>
            {!disponible ? (
              <span className="absolute z-50 bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-white"></span>
            ) : (
              <span className="absolute z-50 bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>

          <div className={styles.status}>
            <span className={styles.statusTitle}>{accountName}</span>
            <span className={styles.statusSubtitle}>{statusMessage}</span>
          </div>
          <div
            className={"cursor-pointer hover:opacity-90"}
            onClick={handleClose}
            aria-hidden={!isOpen}
          >
            <CloseSVG color="#FFF" />
          </div>
        </header>

        <div className={styles.preChatBody}>
          <div
            className={styles.chatBody}
            // style={{ backgroundImage: `url(${darkMode ? darkBG : lightBG})` }}
          >
            {isDelay ? (
              <div className={styles.chatBubble}>
                <div className={styles.typing}>
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                </div>
              </div>
            ) : (
              <div className={styles.message}>
                <span className={styles.triangle} />
                <span className={styles.accountName}>{accountName}</span>
                <p className={styles.messageBody}>{initialMessageByServer}</p>
                <span className={styles.messageTime}>{timeNow}</span>
              </div>
            )}
          </div>
        </div>

        <footer className={styles.chatFooter}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="invisible-input" className="sr-only">
              Label Invisible
            </label>
            <input
              id="invisible-input"
              name="invisible-input"
              disabled={!isOpen || !disponible}
              className={styles.input}
              placeholder={placeholder}
              ref={inputRef}
              dir="auto"
            />
            <button
              disabled={!isOpen}
              type="submit"
              className={styles.buttonSend}
            >
              <SendSVG />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  return isDarkMode;
}
