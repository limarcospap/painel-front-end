import React, { useState, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

// register Handsontable's modules
registerAllModules();

var title = (text) => {
  return <h4>{text}</h4>;
};

var tos = {
  0: "Best Effort",
  10: "Assured Forwarding",
  8: "Clas Selector",
  46: "Expedited Forwarding",
};

// var classification = {
//   0: "Não malicioso",
//   1: "Malicioso",
//   2: "Suspeito"
// };

export default function Teste(props) {
  const toast = useRef(null);
  const websocketURL = "ws://localhost:8087/api/logs/refresh-logs";
  const [obj, setObj] = useState([]);
  const { sendMessage, lastMessage } = useWebSocket(websocketURL, {
    onOpen: () => console.log("Connected to teste"),
    onMessage: (message) => {
      let received = JSON.parse(message.data);
      //if (received.length > obj.length) {
      if (obj.length != 0) {
        toast.current.show({
          severity: "info",
          life: 3000,
          sticky: true,
          summary: "Novo fluxo adicionado!"
        });
      }
      setObj(received);
      //}
    },
    shouldReconnect: (closeEvent) => true,
  });

  var generateDataView = () => {
    return obj.map((item) => {
      return {
        Class: item.RefereePrediction,
        sToS: tos[item.sTos],
        dToS: tos[item.dTos],
        Protocolo: item.Proto_tcp == 0 ? "UDP" : "TCP",
        SrcBytes: item.SrcBytes,
        TotBytes: item.TotBytes,
        TotPkts: item.TotPkts,
        Dur: item.Dur,
      };
    });
  };

  return (
    <div>
      <Toast ref={toast} position="bottom-center" />
      {title("Fluxos")}
      <hr />
      <HotTable
        data={generateDataView()}
        colHeaders={true}
        rowHeaders={false}
        width="auto"
        height="auto"
      >
        <HotColumn data="Protocolo" title="Protocolo" />
        <HotColumn data="sToS" title="Tipo Serviço da Fonte (sToS)" />
        <HotColumn data="dToS" title="Tipo Serviço do Destino (sToS)" />
        <HotColumn data="SrcBytes" title="Bytes Fonte" />
        <HotColumn data="TotBytes" title="Total Bytes" />
        <HotColumn data="Dur" title="Duração" />
        <HotColumn data="TotPkts" title="Total Pacotes" />
        <HotColumn data="Class" title="Classificação" />
      </HotTable>
    </div>
  );
}
