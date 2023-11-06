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
    recognition.lang = "es-ES";
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
      filterProducts(speechResult);
      setIsListening(false);
      recognition.stop();
    };
  });

  function startListening() {
    if (isListening) return;
    setIsListening(true);

    readText(
      "¡Búsqueda por voz activada! Por favor, hable para buscar un producto o categoría."
    );

    setTimeout(() => {
      setText("");
      recognition.start();
    }, 5000);
  }

  function stopListening() {
    setIsListening(false);
    recognition.stop();
  }

  function filterProducts(query: string) {
    const keywords = query
      .toLowerCase()
      .split(" ")
      .filter((word) => !wordsExclude.has(word));
    console.log("excludekeywords", keywords);
    const everyMatch = products.data.filter((product) => {
      const productName = product.attributes.name.toLowerCase();
      return keywords.every((keyword) => productName.includes(keyword));
    });

    if (everyMatch.length > 0) {
      console.log("Resultados con every: ", everyMatch);
      setFilterProduct(everyMatch);
      return;
    }

    const someMatch = products.data.filter((product) => {
      const productName = product.attributes.name.toLowerCase();
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
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 0.9;
  speech.lang = "es-ES";
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
  "pero",
]); // Add wordsExclude
