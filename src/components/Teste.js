import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";

// register Handsontable's modules
registerAllModules();

const hotData = [
  ["", "Tesla", "Volvo", "Toyota", "Honda"],
  ["2020", 10, 11, 12, 13],
  ["2021", 20, 11, 14, 13],
  ["2022", 30, 15, 12, 13],
];

export default function Teste(props) {
  const websocketURL = "ws://localhost:8087/api/logs/refresh-logs";
  const [obj, setObj] = useState([{ name: "mp" }]);
  const { sendMessage, lastMessage } = useWebSocket(websocketURL, {
    onOpen: () => console.log("Connected to teste"),
    onMessage: (message) => {
      setObj(JSON.parse(message.data));
    },
    shouldReconnect: (closeEvent) => true,
  });



  return (
    <HotTable
      data={obj}
      colHeaders={true}
      rowHeaders={false}
      width="auto"
      height="300"
    >
      <HotColumn data="_id" title="ID"/>
      <HotColumn data="Proto_tcp" title="TCP?" />
      <HotColumn data="Proto_udp" title="UDP?" />
      <HotColumn data="Dur" title="Duração"/>
      <HotColumn data="TotBytes" title="Total Bytes"/>
      <HotColumn data="TotPkts" title="Total Pacotes"/>
      <HotColumn data="dTos" title="ToS Destino"/>
      <HotColumn data="sTos" title="Tos Fonte"/>
      <HotColumn data="SrcBytes" title="Bytes Fonte"/>
    </HotTable>
  );
}
