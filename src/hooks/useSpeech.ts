import { useSpeechFilter } from "@/context/speechFilter";
import { useEffect, useState } from "react";
import { useMounted } from "./useMounted";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const { filterProducts } = useSpeechFilter();

  let recognition: any = null;

  const mounted = useMounted();

  if (mounted) {
    recognition =
      new window.webkitSpeechRecognition() || window.SpeechRecognition;
    recognition.continuous = false;
    recognition.lang = "es-PE";
  }
  
  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechResult = event.results[0][0].transcript
        .toLowerCase()
        .replace(/[.,]/g, "");
      filterProducts(speechResult);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      let errorMessage =
        "Se ha producido un error en el reconocimiento de voz.";

      if (event.error === "no-speech") {
        errorMessage = "No se detectó ningún habla.";
      } else if (event.error === "not-allowed") {
        errorMessage =
          "No se permitió el acceso al micrófono. Asegúrese de habilitar los permisos.";
      } else if (event.error === "audio-capture") {
        errorMessage =
          "No se encontró ningún micrófono. Asegúrese de que haya un micrófono instalado";
      }

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
    }, 3000);
  }

  function stopListening() {
    setIsListening(false);
    recognition.stop();
  }

  return {
    isListening,
    hasRecognitionSupport: !!recognition,
    stopListening,
    startListening,
  };
}

export function readText(text: string) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1.2;
  speech.pitch = 0.9;
  speech.lang = "es-PE";
  window.speechSynthesis.speak(speech);
}

export const wordsExclude = new Set([
  "o",
  "de",
  "la",
  "para",
  "y",
  "con",
  "no",
  "al",
  "el",
  "del",
  "en",
  "un",
  "una",
  "los",
  "las",
  "a",
  "por",
  "es",
  "lo",
  "como",
  "mi",
  "se",
  "están",
  "productos",
  "producto",
  "categoría",
  "categorías",
]); // Add wordsExclude

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
