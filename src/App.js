import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./App.css";
import { updateGraph, factorializeFib, factorialize } from "./utils";
export class App extends Component {
  state = {
    factorialData: {
      labels: ["JavaScript", "WebAssembly"],
      datasets: [
        {
          label: "Time taken to complete (in milliseconds)",
          data: [],
          backgroundColor: ["rgba(255, 206, 86, 0.2)", "rgba(153, 102, 255, 0.2)"],
          borderColor: ["rgba(255, 206, 86, 0.2)", "rgba(153, 102, 255, 0.2)"],
          borderWidth: 1
        }
      ]
    },
    factorialFibData: {
      labels: ["JavaScript", "WebAssembly"],
      datasets: [
        {
          label: "Time taken to complete (in milliseconds)",
          data: [],
          backgroundColor: ["rgba(255, 206, 86, 0.2)", "rgba(153, 102, 255, 0.2)"],
          borderColor: ["rgba(255, 206, 86, 0.2)", "rgba(153, 102, 255, 0.2)"],
          borderWidth: 1
        }
      ]
    }
  };

  componentDidMount() {
    this.loadWasm();
  }

  loadWasm = async () => {
    try {
      const wasm = await import("webassembly");
      this.setState({ wasm });
    } catch (err) {
      console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
    }
  };

  updateGraph(time, lang, graph) {
    let data;
    let stateVal;
    if (graph === "fac") {
      data = this.state.factorialData;
      stateVal = "factorialData";
    } else if (graph === "facFib") {
      data = this.state.factorialFibData;
      stateVal = "factorialFibData";
    }

    const datasetsCopy = data.datasets.slice(0);
    const dataCopy = datasetsCopy[0].data.slice(0);
    if (lang === "js") {
      dataCopy[0] = time;
    } else if (lang === "wa") {
      dataCopy[1] = time;
    }
    datasetsCopy[0].data = dataCopy;
    this.setState({
      [stateVal]: Object.assign({}, data, {
        datasets: datasetsCopy
      })
    });
  }

  render() {
    const { wasm = {} } = this.state;
    return (
      <React.Fragment>
        <div className="App">
          <div>
            <p>JavaScript vs WebAssembly speed test</p>
          </div>

          <div className="separator">
            <div className="buttons">
              <button
                onClick={async () => {
                  const t0 = performance.now();
                  await wasm.factorialize(200);
                  const t1 = performance.now();
                  this.updateGraph(t1 - t0, "wa", "fac");
                  const t2 = performance.now();
                  factorialize(200);
                  const t3 = performance.now();
                  this.updateGraph(t3 - t2, "js", "fac");
                }}>
                Calculate the factorial of 200
              </button>
              <button
                onClick={async () => {
                  const t0 = performance.now();
                  await wasm.factorialize_fib(40);
                  const t1 = performance.now();
                  this.updateGraph(t1 - t0, "wa", "facFib");
                  const t2 = performance.now();
                  factorializeFib(40);
                  const t3 = performance.now();
                  this.updateGraph(t3 - t2, "js", "facFib");
                }}>
                Factorialize the first 40 numbers of the fibonacci sequence
              </button>
            </div>
            <div>
              <div className="charts">
                <div>
                  <Bar
                    data={this.state.factorialData}
                    width={400}
                    height={400}
                    options={{
                      maintainAspectRatio: false,
                      scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
                    }}></Bar>
                </div>
                <div>
                  <Bar
                    data={this.state.factorialFibData}
                    width={400}
                    height={400}
                    options={{
                      maintainAspectRatio: false,
                      scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
                    }}></Bar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
