import React from "react";
//https://my-json-server.typicode.com/belfus/promoquidata/todos
import TodoItem from "./TodoItem";
import Sum from "./Sum";
import Loading from "./Loading";
import AddTodoItem from "./AddTodoItem";

const INITIAL_STATE = {
  items: [],
  companies: []
};

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    fetch("https://my-json-server.typicode.com/belfus/promoquidata/todos")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          items: data
            .filter((item) => item.state !== "delete")
            .sort((a, b) => a.company.localeCompare(b.company))
        });
      });
  }

  handleCheck(i) {
    const { items } = this.state;

    items[i].state = items[i].state === "active" ? "check" : "active";

    this.setState({ items });
  }

  handleShiftUp(i) {
    const { items } = this.state;

    if (i > 0 && items[i - 1].company === items[i].company) {
      [items[i], items[i - 1]] = [items[i - 1], items[i]];
    }
    this.setState({ items });
  }

  handleShiftDown(i) {
    const { items } = this.state;

    if (i < items.length - 1 && items[i + 1].company === items[i].company) {
      [items[i], items[i + 1]] = [items[i + 1], items[i]];
      this.setState({ items });
    }
  }

  handleAdd(item) {
    const { items } = this.state;
    let i = 0;
    while (
      items[i].company.localeCompare(item.company) < 1 &&
      i++ < items.length - 1
    );

    this.setState({
      items: items.splice(i, 0, {
        id: this.state.items.length,
        text: item.name,
        state: "active",
        price: item.price,
        company: item.company
      })
    });
  }

  render() {
    const items = this.state.items;
    let lastCompany = "";
    return (
      <div>
        <AddTodoItem handleAdd={(item) => this.handleAdd(item)} />
        {!items && <Loading />}
        {items &&
          items.map((item, i) => {
            let component = null;
            let sum = null;
            if (lastCompany !== item.company) {
              if (lastCompany !== "")
                sum = (
                  <Sum
                    items={items.filter((item) => item.company === lastCompany)}
                  />
                );
              lastCompany = item.company;
              component = <div>{item.company}</div>;
            }
            return (
              <React.Fragment>
                {sum}
                {sum && <hr />}
                {component}
                <TodoItem
                  key={item.id}
                  item={item}
                  handleCheck={() => this.handleCheck(i)}
                  handleShiftUp={() => this.handleShiftUp(i)}
                  handleShiftDown={() => this.handleShiftDown(i)}
                />
                {i === items.length - 1 && (
                  <React.Fragment>
                    <Sum
                      items={items.filter(
                        (item) => item.company === lastCompany
                      )}
                    />
                    <hr />
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}
        <Sum items={items} />
      </div>
    );
  }
}

export default TodoApp;

//1. somma del gruppo degli elementi non checkati........V
//2. somma di tutti gli elementi del gruppo..............V

//--- BONUS ---
//3. elementi ordinabili.................................V
//4. aggiunta di un elemento con company.................V
