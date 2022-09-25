import React, { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import JSONPretty from "react-json-pretty";

export default function DefProtActions(props) {
  const url = "http://localhost:8087/api/saidas/get";
  const [saidas, setSaidas] = useState([]);
  useEffect(() => {
    const fetchSaidas = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => setSaidas(data["msg"]));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchSaidas();
  }, []);

  return (
    <div>
      <div className="divider">
        <h4>{"Defesas Executadas"}</h4>
      </div>
      {saidas.map((saida) => {
        const header = `Id: ${saida['_id']} | Tipo de Ataque: ${saida['ataque']}`
        return (
          <Panel toggleable header={header}>
            <JSONPretty id="json-pretty" data={saida}></JSONPretty>
          </Panel>
        );
      })}
    </div>
  );
}
