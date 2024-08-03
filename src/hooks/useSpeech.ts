"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMounted } from "./useMounted";
import { useCartContext } from "@/context/cart.context";

export function useSpeechRecognition() {
  const { isLoading, setIsLoading } = useCartContext();
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
    if (isLoading) return;
    setIsLoading(true);
    const randomMessage = getRandomMessage();
    readText(randomMessage);

    setTimeout(() => {
      recognition.start();
    }, 2000);
  }

  function stopListening() {
    setIsLoading(false);
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
  "¡Estoy aquí para ayudarte con tus materiales eléctricos!",
  "¿En qué puedo asistirte hoy en nuestra tienda?",
  "Hable conmigo, estoy aquí para encontrar lo que necesitas.",
  "¡Vamos a encontrar los productos que buscas!",
  "¿Cómo puedo ser de servicio en Consorcio A&C eléctrica S.A.C?",
  "Estoy listo para responder tus preguntas sobre nuestros productos.",
  "No dudes en hablarme, estoy aquí para ayudarte a encontrar materiales eléctricos.",
  "Explícame en qué puedo colaborar contigo en nuestra tienda.",
  "¿Tienes alguna solicitud en particular sobre nuestros productos?",
  "Estoy a tu disposición, ¿en qué puedo ayudarte hoy?",
  "Puedo ayudarte a encontrar información o productos específicos.",
  "¡Hola! ¿En qué puedo servirte hoy en Consorcio A&C eléctrica S.A.C?",
  "Estoy aquí para facilitarte la búsqueda de materiales eléctricos.",
  "Tu satisfacción es mi prioridad. ¿En qué puedo ayudarte con nuestros productos?",
  "¿Necesitas algo en específico de nuestra tienda? Cuéntame.",
  "Juntos, encontraremos la respuesta a tu consulta sobre nuestros productos.",
  "Hablemos, ¿qué necesitas encontrar en Consorcio A&C eléctrica S.A.C?",
];

export function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * randomMessages.length);
  return randomMessages[randomIndex];
}
