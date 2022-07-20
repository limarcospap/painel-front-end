import { useState } from "react";
import useWebSocket from "react-use-websocket";
export default function Teste(props) {
  const [mensagem, setMensagem] = useState("Hei hei");

  const { lastJsonMessage, sendMessage } = useWebSocket(
    "ws://localhost:8089/api/logs/refresh-logs",
    {
      onOpen: () => console.log("Connected to teste"),
      onMessage: (lastJsonMessage) => {
        if (lastJsonMessage) {
          setMensagem(lastJsonMessage?.data);
        }
      },
      shouldReconnect: (closeEvent) => true,
    }
  );

  return <span>Este é um teste {mensagem} </span>;
}
