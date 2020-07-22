import React from "react";

const style = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: "1rem"
};

const INITIAL_STATE = { name: "", company: "", price: 42 };

export default class AddTodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleChangeName(name) {
    this.setState({ name });
  }

  handleChangeCompany(company) {
    this.setState({ company });
  }

  handleChangePrice(price) {
    this.setState({ price });
  }

  handleSubmit() {
    this.props.handleAdd({
      ...this.state
    });

    this.setState(INITIAL_STATE);
  }

  render() {
    const { name, company, price } = this.state;
    return (
      <div>
        <form style={style} autoComplete="off">
          <input
            type="text"
            name="todo"
            placeholder="Name"
            required
            onChange={(event) => this.handleChangeName(event.target.value)}
            value={name}
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            required
            onChange={(event) => this.handleChangeCompany(event.target.value)}
            value={company}
          />
          <label>
            <input
              type="number"
              min="1"
              step="1"
              name="price"
              placeholder="Price"
              value={price}
              required
              onChange={(event) => this.handleChangePrice(event.target.value)}
            />
            &nbsp;&euro;&nbsp;
          </label>
          <input
            type="submit"
            value="Aggiungi"
            onClick={() => this.handleSubmit()}
          />
        </form>
      </div>
    );
  }
}
