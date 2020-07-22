import React from "react";
//https://my-json-server.typicode.com/belfus/promoquidata/todos
import TotalAmount from "./TotalAmount";
import Loading from "./Loading";
import AddTodoItem from "./AddTodoItem";
import CompanyTodoItems from "./CompanyTodoItems";

const INITIAL_STATE = {
  items: [],
  itemsPerCompany: {}
};

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    fetch("https://my-json-server.typicode.com/belfus/promoquidata/todos")
      .then((response) => response.json())
      .then((data) => {
        const items = data
          .filter((item) => item.state !== "delete")
          .sort((a, b) => a.company.localeCompare(b.company));

        const itemsPerCompany = items.reduce((map, item) => {
          if (typeof map[item.company] === "undefined")
            map[item.company] = new Array();
          map[item.company].push(item);
          return map;
        }, {});

        this.setState({
          items: items,
          itemsPerCompany: itemsPerCompany
        });
      });

    this.handleCheck = this.handleCheck.bind(this);
    this.handleShiftUp = this.handleShiftUp.bind(this);
    this.handleShiftDown = this.handleShiftDown.bind(this);
    this.handleShiftDown = this.handleShiftDown.bind(this);
  }

  handleCheck(companyName, i) {
    const { itemsPerCompany } = this.state;

    itemsPerCompany[companyName][i].state =
      itemsPerCompany[companyName][i].state === "active" ? "check" : "active";

    this.setState({ itemsPerCompany });
  }

  handleShiftUp(companyName, i) {
    const { itemsPerCompany } = this.state;

    if (i > 0) {
      [itemsPerCompany[companyName][i], itemsPerCompany[companyName][i - 1]] = [
        itemsPerCompany[companyName][i - 1],
        itemsPerCompany[companyName][i]
      ];
    }

    this.setState({ itemsPerCompany });
  }

  handleShiftDown(companyName, i) {
    const { itemsPerCompany } = this.state;

    if (i < itemsPerCompany[companyName].length - 1) {
      [itemsPerCompany[companyName][i], itemsPerCompany[companyName][i + 1]] = [
        itemsPerCompany[companyName][i + 1],
        itemsPerCompany[companyName][i]
      ];
      this.setState({ itemsPerCompany });
    }
  }

  handleAdd(item) {
    const { items, itemsPerCompany } = this.state;
    let i = 0;
    while (
      items[i].company.localeCompare(item.company) < 1 &&
      i++ < items.length - 1
    );

    const newItem = {
      id: this.state.items.length,
      text: item.name,
      state: "active",
      price: item.price,
      company: item.company
    };

    itemsPerCompany[item.company] = itemsPerCompany[item.company]
      ? itemsPerCompany[item.company].concat(newItem)
      : new Array(newItem);

    items.splice(i, 0, newItem);

    this.setState({
      items,
      itemsPerCompany
    });
  }

  render() {
    const { items, itemsPerCompany } = this.state;
    const companies = Object.keys(itemsPerCompany);
    return (
      <div>
        <AddTodoItem handleAdd={(item) => this.handleAdd(item)} />
        {!companies && <Loading />}
        {companies &&
          companies.map((company, key) => (
            <CompanyTodoItems
              key={key}
              items={itemsPerCompany[company]}
              companyName={company}
              handleCheck={this.handleCheck}
              handleShiftUp={this.handleShiftUp}
              handleShiftDown={this.handleShiftDown}
            />
          ))}
        <TotalAmount items={items} />
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
