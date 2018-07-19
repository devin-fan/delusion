import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      opened: false,
      display: "none",
      x: 0,
      y: 0
    }
    this.onClick = this.onClick.bind(this)
    this.cardChangeFinished = this.cardChangeFinished.bind(this)
  }

  onClick () {
    let card = document.getElementById("card-1")
    let rect = card.getBoundingClientRect()
    if (!this.state.opened) {
      document.getElementById("modal-card-1").style.display = "block"
      document.getElementById("card-1-placeholder").style.display = "block"
      card.style.position = "absolute"
    }
    this.setState({ opened: !this.state.opened, 
      display: this.state.opened ? "none" : "block",
      x: this.state.opened ? 0 : 0 - rect.left,
      y: this.state.opened ? 0 : 0 - rect.top})
  }

  cardChangeFinished() {
    if (!this.state.opened) {
      document.getElementById("modal-card-1").style.display = "none"
      document.getElementById("card-1").style.position = "relative"
      document.getElementById("card-1-placeholder").style.display = "none"
    }
  }

  render() {
    const springconfig = { stiffness: 100, damping: 20};
    return (
      <div className="App">
        <Motion
          defaultstyle={{ height: 100, width: 100 }}
          style={{ 
            height: spring(this.state.opened ? window.innerHeight : 100, springconfig),
            width: spring(this.state.opened ? window.innerWidth : 100, springconfig),
            opacity: spring(this.state.opened ? 1 : 0, springconfig),
            x: spring(this.state.x, springconfig),
            y: spring(this.state.y, springconfig)
          }} 
          onRest={this.cardChangeFinished}>
          {style => <div id="card-1" className="card" onClick={this.onClick} style={{height: `${style.height}px`, width: `${style.width}px`, transform: `translate3d(${style.x}px, ${style.y}px, 0)`}}><div id="modal-card-1" className="modal-card" style={{opacity: style.opacity}}></div></div>}
        </Motion>
        <div id="card-1-placeholder" className="placeholder"></div>
        <div className="card"></div>
      </div>
    );
  }
}

export default App;
