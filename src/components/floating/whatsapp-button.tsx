"use client";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export default function WhatsappButton() {
  const saludos = [
    "¡Hola! ¿En qué puedo ayudarte?",
    "Buen día, ¿cómo puedo asistirte?",
    "¡Bienvenido! Estoy aquí para ayudarte.",
    "Hola, ¿tienes alguna pregunta con la que pueda ayudarte?",
  ];

  const obtenerEstadoPorHorario = () => {
    const horaActual = new Date().getHours();
    if (
      (horaActual >= 8 && horaActual < 12) ||
      (horaActual >= 14 && horaActual < 19)
    ) {
      return {
        mensaje: "Disponible",
        disponible: true,
        state: "Disponible",
      };
    } else {
      return {
        mensaje: `Actualmente no disponible. Nuestro horario de atención es de Lunes a Sábado de 8:00 a 12:00 y de 14:00 a 19:00.`,
        disponible: false,
        state: "No disponible",
      };
    }
  };

  const saludoAleatorio = saludos[Math.floor(Math.random() * saludos.length)];
  const { mensaje, disponible, state } = obtenerEstadoPorHorario();

  return (
    <FloatingWhatsApp
      accountName="Paolo Gallardo"
      initialMessageByServer={disponible ? saludoAleatorio : mensaje}
      statusMessage={state}
      placeholder="Escribe aquí..."
      allowEsc={true}
      disponible={disponible}
    />
  );
}
