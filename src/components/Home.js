import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";

// register Handsontable's modules
registerAllModules();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      packetNumber: 0,
      displayLoading: "none",
      src: "",
      dst: "",
      sTos: 0,
      dTos: 0,
      SrcBytes: 0,
      TotBytes: 0,
      TotPkts: 0,
      Dur: 0,
      Dir: "half",
      protocol: "TCP",
    };
    this.showSuccess = this.showSuccess.bind(this);
  }

  showSuccess(msg) {
    this.toast.show({ severity: "success", summary: msg, life: 3000 });
  }

  sniff(e) {
    this.setState({ displayLoading: "" });
    e.preventDefault();
    try {
      fetch(`http://localhost:8001/sniff?count=${this.state.packetNumber}`)
        .then((response) => response.json())
        .then((data) => {
          this.showSuccess(data.msg);
          this.setState({ displayLoading: "none" });
        });
    } catch (exception) {
      console.log(exception);
    }
  }

  sendFlow(e) {
    this.setState({ displayLoading: "" });
    const dataToSend = {
      src: this.state.src,
      dst: this.state.dst,
      sTos: this.state.sTos,
      dTos: this.state.dTos,
      Proto_tcp: this.state.protocol === "TCP" ? 1 : 0,
      Proto_udp: this.state.protocol === "UDP" ? 1 : 0,
      SrcBytes: parseInt(this.state.SrcBytes),
      TotBytes: parseInt(this.state.TotBytes),
      TotPkts: parseInt(this.state.TotPkts),
      "Dir_->": this.state.Dir === "half" ? 1 : 0,
      "Dir_<->": this.state.Dir === "full" ? 1 : 0,
      Dur: parseFloat(this.state.Dur),
    };

    console.log(dataToSend);

    fetch("http://localhost:8001/flow", {
      method: "POST",
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        this.showSuccess(data.msg);
        this.setState({ displayLoading: "none" });
      });
  }

  renderSendFlow = () => {
    return (
      <div>
        <div className="box-element">
          <label htmlFor="victim" className="block">
            Ip de Origem:
          </label>
          <InputText
            className="block input-custom"
            id="victim"
            value={this.state.src}
            onChange={(e) =>
              this.setState((states, props) => {
                return { src: e.target.value };
              })
            }
          />
        </div>
        <div className="box-element">
          <label htmlFor="victim" className="block">
            Ip de Destino:
          </label>
          <InputText
            className="block input-custom"
            id="victim"
            value={this.state.dst}
            onChange={(e) =>
              this.setState((states, props) => {
                return { dst: e.target.value };
              })
            }
          />
        </div>
        <div className="box-element">
          <label htmlFor="stos" className="block">
            Tipo de Serviço da Fonte:
          </label>
          <InputText
            className="block input-custom"
            id="stos"
            value={this.state.sTos}
            onChange={(e) =>
              this.setState((states, props) => {
                return { sTos: e.target.value };
              })
            }
          />
        </div>
        <div className="box-element">
          <label htmlFor="dtos" className="block">
            Tipo de Serviço do Destino:
          </label>
          <InputText
            className="block input-custom"
            id="dtos"
            value={this.state.dTos}
            onChange={(e) =>
              this.setState((states, props) => {
                return { dTos: e.target.value };
              })
            }
          />
        </div>
        <div className="box-element">
          <label htmlFor="victim" className="block">
            Protocolo (TCP ou UDP):
          </label>
          <InputText
            className="block input-custom"
            id="victim"
            value={this.state.protocol}
            onChange={(e) =>
              this.setState((states, props) => {
                return { protocol: e.target.value };
              })
            }
          />
        </div>
        <div className="box-element">
          <label htmlFor="srcBytes" className="block">
            Bytes da Fonte:
          </label>
          <InputText
            className="block input-custom"
            id="srcBytes"
            value={this.state.SrcBytes}
            onChange={(e) =>
              this.setState((states, props) => {
                return { SrcBytes: e.target.value };
              })
            }
          />
        </div>
        <div className="box-element">
          <label htmlFor="totBytes" className="block">
            Total de Bytes:
          </label>
          <InputText
            className="block input-custom"
            id="totBytes"
            value={this.state.TotBytes}
            onChange={(e) =>
              this.setState((states, props) => {
                return { TotBytes: e.target.value };
              })
            }
          />
        </div>
        <div className="box-element">
          <label htmlFor="victim" className="block">
            Duração:
          </label>
          <InputText
            className="block input-custom"
            id="victim"
            value={this.state.Dur}
            onChange={(e) =>
              this.setState((states, props) => {
                return { Dur: e.target.value };
              })
            }
          />
        </div>
        <div className="box-element">
          <label htmlFor="victim" className="block">
            Direção (full ou half duplex):
          </label>
          <InputText
            className="block input-custom"
            id="victim"
            value={this.state.Dir}
            onChange={(e) =>
              this.setState((states, props) => {
                return { Dir: e.target.value };
              })
            }
          />
        </div>
        <div className="box-element">
          <label htmlFor="totPkts" className="block">
            Total de Pacotes:
          </label>
          <InputText
            className="block input-custom"
            id="totPkts"
            value={this.state.TotPkts}
            onChange={(e) =>
              this.setState((states, props) => {
                return { TotPkts: e.target.value };
              })
            }
          />
        </div>
        <Button
          onClick={(e) => this.sendFlow(e)}
          className="p-button-warning p-button-rounded button-custom"
        >
          <span className="button-text">Enviar</span>
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Toast ref={(el) => (this.toast = el)} position="bottom-center" />
        <div className="divider">
          <span className="sniff-text h5">Varredura da Rede:</span>
        </div>
        <div class="divider">
          <span className="sniff-text">Digite o número de pacotes:</span>
          <InputText
            className="block input-custom"
            id="packetsNumber"
            tooltip="Número de Pacotes"
            value={this.state.packetNumber}
            onChange={(e) => this.setState({ packetNumber: e.target.value })}
          />
          <Button
            onClick={(e) => this.sniff(e)}
            className="p-button-warning p-button-rounded button-custom"
          >
            <span className="button-text">Varrer</span>
          </Button>
        </div>
        <div>
          <ProgressBar
            mode="indeterminate"
            style={{ height: "7px", display: this.state.displayLoading }}
          ></ProgressBar>
        </div>
        <div className="divider">
          <span className="sniff-text h5">Enviar Pacote:</span>
        </div>
        <div className="divider">{this.renderSendFlow()}</div>
      </div>
    );
  }
}
