import { ProductNAInterface } from "@/models/newArrivals.model";
import productStorage from "@/store/product.store";
import { useEffect, useState } from "react";
import { useMounted } from "./useMounted";

export function useSpeechRecognition() {
  const products = productStorage((state) => state.productState);
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [filterProduct, setFilterProduct] = useState<ProductNAInterface[]>([]);

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
      console.log("onresult event ", event);
      console.log("products  ", products.data);

      const speechResult = event.results[0][0].transcript
        .toLowerCase()
        .replace(/[.,]/g, "");
      setText(speechResult);
      readText("Estos son los resultados de: " + speechResult);
      filterProductDescription(speechResult);
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

    readText("¡Por favor!, hable para buscar un producto o categoría.");

    setTimeout(() => {
      setText("");
      recognition.start();
    }, 3000);
  }

  function stopListening() {
    setIsListening(false);
    recognition.stop();
  }

  function filterProductDescription(query: string) {
    const keywords = query
      .toLowerCase()
      .split(" ")
      .filter((word) => !wordsExclude.has(word));
    console.log("excludekeywords", keywords);
    const everyMatch = products.data.filter((product) => {
      const productName = product.attributes.description.toLowerCase();
      return keywords.every((keyword) => productName.includes(keyword));
    });

    if (everyMatch.length > 0) {
      console.log("Resultados con every: ", everyMatch);
      setFilterProduct(everyMatch);
      return;
    }

    const someMatch = products.data.filter((product) => {
      const productName = product.attributes.description.toLowerCase();
      return keywords.some((keyword) => productName.includes(keyword));
    });

    console.log("Resultados con some: ", someMatch);
    setFilterProduct(someMatch);
  }

  return {
    text,
    isListening,
    hasRecognitionSupport: !!recognition,
    filterProduct,
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
