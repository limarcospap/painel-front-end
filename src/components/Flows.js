import React, { useState, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import "../styles/Basic.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
var title = (text) => {
  return <h4>{text}</h4>;
};

var tos = {
  0: "Best Effort",
  10: "Assured Forwarding",
  8: "Clas Selector",
  46: "Expedited Forwarding",
};

const defenses = [
  { name: "Denial Of Service", value: "denialofservice" },
  { name: "Intrusão", value: "intrusion" },
  { name: "Trojan", value: "trojan" },
  { name: "Worm", value: "worm" },
];

const protocols = [
  { name: "TCP", value: "1" },
  { name: "UDP", value: "0" },
];

const classifications = [
  { name: "Suspeito", value: "suspicious" },
  { name: "Normal", value: "normal" },
  { name: "Malicioso", value: "bot" },
];

const classificationRenderer = {
  bot: "Malicioso",
  normal: "Normal",
  suspicious: "Suspeito",
};

// var classification = {
//   0: "Não malicioso",
//   1: "Malicioso",
//   2: "Suspeito"
// };

export default function Flows(props) {
  // States
  const toast = useRef(null);
  const websocketURL = "ws://localhost:8087/api/logs/refresh-logs";
  const [obj, setObj] = useState([]);
  const [flows, setFlows] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [defense, setDefense] = useState("");
  const [ipVictim, setIpVictim] = useState("192.168.0.1");
  const [ipAttacker, setIpAttacker] = useState("192.168.0.2");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Class: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    Protocolo: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  // WS connection
  const { sendMessage, lastMessage } = useWebSocket(websocketURL, {
    onOpen: () => console.log("Connected to teste"),
    onMessage: (message) => {
      let received = JSON.parse(message.data);
      if (received.length > flows.length) {
        const numberOfFlows = received.length - flows.length;
        if (flows.length != 0) {
          toast.current.show({
            severity: "info",
            life: 3000,
            sticky: true,
            summary: `Foi(ram) adicionado(s) ${numberOfFlows} novos fluxo(s)`,
          });
        }
        setFlows(generateDataView(received));
      }
    },
    shouldReconnect: (closeEvent) => false,
  });
  // Rendering data on HT
  var generateDataView = (data) => {
    return data.map((item) => {
      console.log(item.RefereePrediction);
      return {
        Class: item.hasOwnProperty("Label")
          ? classificationRenderer[item.Label]
          : classificationRenderer[item.RefereePrediction],
        sToS: tos[item.sTos],
        dToS: tos[item.dTos],
        Protocolo: item.Proto_tcp == 0 ? "UDP" : "TCP",
        SrcBytes: item.SrcBytes,
        TotBytes: item.TotBytes,
        TotPkts: item.TotPkts,
        Dur: item.Dur,
        Src: item.src,
        Dst: item.dst,
      };
    });
  };

  function applyDefense() {
    try {
      fetch(
        `http://localhost:4000/${defense}?ip_vitima=${ipVictim}&ip_atacante=${ipAttacker}`
      ).then((response) => console.log(response));
    } finally {
      toast.current.show({
        severity: "success",
        life: 3000,
        sticky: true,
        summary: `Defesa do tipo ${defense} aplicada com sucesso! Veja na página de logs.`,
      });
      setShowDialog(false);
    }
  }

  return (
    <div>
      <Toast ref={toast} position="bottom-center" />

      <div class="divider">
        <FontAwesomeIcon icon="fa-light fa-monitor-waveform" />
        {title("Monitor de Fluxos")}
      </div>
      <div className="divider box">
        <div className="align-left">
          <Button
            onClick={() => setShowDialog(true)}
            className="p-button-warning p-button-rounded button-custom"
          >
            Selecionar Defesa
          </Button>
        </div>
      </div>
      <div>
        <DataTable
          value={flows}
          responsiveLayout="scroll"
          selectionMode="single"
          scrollable
          scrollHeight="600px"
          paginator
          rows={10}
          filters={filters}
          onFilter={(e) => setFilters(e.filters)}
          stateStorage="local"
          stateKey="dt-state-demo-local"
          emptyMessage="Não foram encontrados fluxos para esses filtros."
        >
          <Column field="Protocolo" header="Protocolo" filter />
          <Column field="sToS" header="Tipo Serviço da Fonte (sToS)" />
          <Column field="dToS" header="Tipo Serviço do Destino (sToS)" />
          <Column field="SrcBytes" header="Bytes Fonte" />
          <Column field="TotBytes" header="Total Bytes" />
          <Column field="Dur" header="Duração" />
          <Column field="TotPkts" header="Total Pacotes" />
          <Column field="Dst" header="Ip Destino" />
          <Column field="Src" header="Ip Origem" />
          <Column field="Class" header="Classificação" filter />
        </DataTable>
      </div>
      <hr />
      <Dialog
        header="Selecione uma defesa"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
      >
        <div className="box">
          <div className="box-element">
            <label htmlFor="victim" className="block">
              Ip da Vítima:
            </label>
            <InputText
              className="block input-custom"
              id="victim"
              tooltip="Ip da Vítima"
              value={ipVictim}
              onChange={(e) => setIpVictim(e.target.value)}
            />
          </div>
          <div className="box-element">
            <label htmlFor="attacker" className="block">
              Ip do Atacante:
            </label>
            <InputText
              className="block input-custom"
              id="attacker"
              tooltip="Ip do Atacante"
              value={ipAttacker}
              onChange={(e) => setIpAttacker(e.target.value)}
            />
          </div>
          <div className="box-element">
            <Dropdown
              className="input-custom"
              optionLabel="name"
              value={defense}
              options={defenses}
              onChange={(e) => setDefense(e.value)}
              placeholder="Defesas"
            ></Dropdown>
          </div>
          <Button
            className="p-button-danger apply-button p-button-rounded button-custom"
            onClick={applyDefense}
          >
            <span className="button-text">Aplicar</span>
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
