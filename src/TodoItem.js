import React from "react";

const style = {
  inlineSpace: {
    marginRight: ".5rem"
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start"
  },
  text: {
    minWidth: "100px",
    textAlign: "left"
  },
  price: {
    minWidth: "35px",
    textAlign: "right"
  },
  delete: {
    minWidth: "25px"
  },
  strikeThrough: {
    textDecoration: "line-through"
  },
  clickable: {
    cursor: "pointer"
  }
};

const TodoItem = (props) => {
  const { handleCheck, item, handleShiftUp, handleShiftDown } = props;
  return (
    <div style={style.item}>
      <input
        type="checkbox"
        checked={item.state === "check"}
        onChange={handleCheck}
        style={style.inlineSpace}
      />
      <div
        style={Object.assign(
          {},
          style.inlineSpace,
          style.text,
          item.state === "check" ? style.strikeThrough : {}
        )}
      >
        {item.text}
      </div>
      <div style={{ ...style.price, ...style.inlineSpace }}>{item.price}</div>
      <div style={{ ...style.delete, ...style.inlineSpace }}>
        {item.state === "check" && <span>X</span>}
      </div>
      <div
        style={{ ...style.inlineSpace, ...style.clickable }}
        onClick={handleShiftUp}
      >
        &#9650;
      </div>
      <div
        style={{ ...style.inlineSpace, ...style.clickable }}
        onClick={handleShiftDown}
      >
        &#9660;
      </div>
    </div>
  );
};

TodoItem.defaultProps = {
  handleCheck: () => {}
};

export default TodoItem;
