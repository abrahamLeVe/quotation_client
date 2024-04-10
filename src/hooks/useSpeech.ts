"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMounted } from "./useMounted";
import { useProductContext } from "@/context/product.context";

export function useSpeechRecognition() {
  const { isListening, setIsListening } = useProductContext();
  const router = useRouter();

  let recognition: any = null;

  const mounted = useMounted();

  if (mounted) {
    recognition =
      new window.webkitSpeechRecognition() || window.SpeechRecognition;
    recognition.continuous = false;
    recognition.lang = "es-ES";
  }

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechResult = event.results[0][0].transcript;
      router.push(`/filter/search?query=${speechResult}`);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const errorMessages = {
        aborted: "La operación de reconocimiento de voz fue abortada.",
        "audio-capture":
          "No se encontró ningún micrófono. Asegúrese de que haya un micrófono instalado",
        "bad-grammar": "Error de gramática en el reconocimiento de voz.",
        "language-not-supported":
          "Idioma no compatible para el reconocimiento de voz.",
        network: "Error de red en el reconocimiento de voz.",
        "no-speech": "No se detectó ningún habla.",
        "not-allowed":
          "No se permitió el acceso al micrófono. Asegúrese de habilitar los permisos.",
        "service-not-allowed":
          "El servicio de reconocimiento de voz no está permitido.",
      };

      const errorMessage =
        errorMessages[event.error] ||
        "Se ha producido un error en el reconocimiento de voz.";

      readText(errorMessage);
    };

    recognition.onend = () => {
      stopListening();
    };
  });

  function startListening() {
    if (isListening) return;
    setIsListening(true);
    const randomMessage = getRandomMessage();
    readText(randomMessage);

    setTimeout(() => {
      recognition.start();
    }, 2000);
  }

  function stopListening() {
    setIsListening(false);
    recognition.stop();
  }

  return {
    hasRecognitionSupport: !!recognition,
    stopListening,
    startListening,
  };
}

export function readText(text: string) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1.2;
  speech.pitch = 0.9;
  speech.lang = "es-ES";
  window.speechSynthesis.speak(speech);
}

const randomMessages = [
  "¡Estoy aquí para ayudarte!",
  "¿En qué puedo asistirte hoy?",
  "Hable conmigo, estoy escuchando.",
  "¡Vamos a encontrar lo que necesitas!",
  "¿Cómo puedo ser de servicio?",
  "Estoy listo para responder tus preguntas.",
  "No dudes en hablarme, estoy para ayudarte.",
  "Explícame en qué puedo colaborar contigo.",
  "¿Tienes alguna solicitud en particular?",
  "Estoy a tu disposición, ¿en qué puedo hacerlo mejor?",
  "Puedo ayudarte a encontrar información o productos.",
  "¡Hola! ¿En qué puedo servirte hoy?",
  "Estoy aquí para facilitarte la búsqueda.",
  "Tu satisfacción es mi prioridad. ¿En qué puedo ayudarte?",
  "¿Necesitas algo en específico? Cuéntame.",
  "Juntos, encontraremos la respuesta a tu consulta.",
  "Hablemos, ¿qué necesitas encontrar?",
];

export function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * randomMessages.length);
  return randomMessages[randomIndex];
}
