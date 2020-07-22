import React from "react";
import "./styles.css";
import logo from "./img/logo.png";
import TodoApp from "./TodoApp";

export default function App() {
  return (
    <div className="App">
      <img className="logo" src={logo} alt="logo" />
      <div className="content">
        <TodoApp />
      </div>
    </div>
  );
}
