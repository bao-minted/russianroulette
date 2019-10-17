import React, { Component } from "react";
import "./App.css";

const gif = {
  ALIVE: "https://media2.giphy.com/media/SD1F312K5aK08/source.gif",
  DEAD: "https://media1.giphy.com/media/LzQim5pixFmqk/source.gif"
};

export default class App extends Component {
  state = {
    count: 0,
    message: "",
    chambers: [0, 1, 2, 3, 4, 5],
    players: [],
    users: [],
    isPause: true
  };

  fire() {
    const playerChoice = this.state.chambers[
      Math.floor(Math.random() * this.state.chambers.length)
    ];
    const computerChoice = this.state.chambers[
      Math.floor(Math.random() * this.state.chambers.length)
    ];
    let message = "ALIVE";
    let idx;
    let count = this.state.count;
    console.log("players", this.state.players.length);
    if (this.state.count + 1 >= this.state.players.length) {
      idx = 0;
      count = 0;
    } else idx = this.state.count + 1;
    if (playerChoice === computerChoice) {
      let clone = this.state.players.filter(
        name => name !== this.state.currentU
      );
      message = "DEAD";
      this.setState({
        chambers: [],
        count: count + 1,
        currentU: this.state.players[idx],
        players: clone,
        isPause: true
      });
    } else if (playerChoice !== computerChoice) {
      this.setState({
        chambers: this.state.chambers.slice(0, this.state.chambers.length - 1),
        count: count + 1,
        currentU: this.state.players[idx]
      });
      console.log(this.state.chambers);
    }
    this.setState({ message: message });
  }

  setUpGame() {
    this.setState({
      players: this.state.players.concat(this.state.input),
      input: ""
    });
  }

  selectUser = () => {
    let users = this.state.players.slice(0);
    this.setState({
      players: users,
      users: users,
      currentU: users[0],
      isPause: false
    });
  };

  render() {
    console.log("players", this.state);
    return (
      <div className="App">
        <h1>Russian Roulette</h1>
        <input
          value={this.state.input}
          onChange={e => this.setState({ input: e.target.value })}
        />
        <button onClick={() => this.setUpGame()}>Sign your death waiver</button>

        <h2>
          Chance of dying:{" "}
          {parseInt((1 * 100) / this.state.chambers.length) > -1
            ? parseInt((1 * 100) / this.state.chambers.length)
            : 100}
          %
        </h2>
        <p>{this.state.message}</p>
        <div style={{ height: 300 }}>
          <img src={gif[this.state.message]} alt={this.state.message} />
        </div>
        <br />
        {this.state.players.length > 0 && (
          <div>
            <button onClick={() => this.selectUser()}>Say a prayer</button>
            <p>
              {" "}
              Player: {this.state.players.length > 0 ? this.state.currentU : ""}
            </p>
            {!this.state.isPause ? (
              <button onClick={() => this.fire()}>Pull the trigger</button>
            ) : (
              <></>
            )}
            <button
              onClick={() =>
                this.setState({
                  chambers: [0, 1, 2, 3, 4, 5],
                  message: "",
                  count: 0
                })
              }
            >
              Replay
            </button>
          </div>
        )}
      </div>
    );
  }
}
