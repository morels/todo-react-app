import React from "react";

const TodoItem = ({ props }) => (
  <div>
    <div>{props.text}</div>
    <div>{props.price}</div>
  </div>
);

export default TodoItem;
