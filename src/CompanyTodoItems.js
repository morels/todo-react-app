import React from "react";
import TodoItem from "./TodoItem";
import TotalAmount from "./TotalAmount";

const CompanyTodoItems = (props) => {
  const {
    companyName,
    items,
    handleCheck,
    handleShiftUp,
    handleShiftDown
  } = props;
  return (
    <div>
      <h2>{companyName}</h2>
      {items &&
        items.map((item, i) => (
          <TodoItem
            key={item.id}
            item={item}
            handleCheck={() => handleCheck(companyName, i)}
            handleShiftUp={() => handleShiftUp(companyName, i)}
            handleShiftDown={() => handleShiftDown(companyName, i)}
          />
        ))}
      <TotalAmount items={items} />
    </div>
  );
};

export default CompanyTodoItems;
