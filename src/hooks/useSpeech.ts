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
    setText("");
    setIsListening(true);
    recognition.start();
  }

  function stopListening() {
    setIsListening(false);
    recognition.stop();
  }

  function filterProducts(query: string) {
    const keywords = query.toLowerCase().split(" ");

    const filteredProducts = products.data.filter((product) => {
      const productName = product.attributes.name.toLowerCase();
      return keywords.some((keyword) => productName.includes(keyword));
    });
    setFilterProduct(filteredProducts);
    console.log("filteredProducts ", filteredProducts);
  }
  // console.log("filterProduct ", filterProduct);

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
