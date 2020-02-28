import React, { Component } from "react";
import axios from "axios";

export class AddProject extends Component {
  state = {
    title: "",
    description: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { title, description } = this.state;

    axios
      .post("http://localhost:5000/api/projects", { title, description })
      .then(() => {
        // REFRESH THE PROJECT LIST
        this.props.getData();

        // RESET THE FROM STATE
        this.setState({ title: "", description: "" });
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>title</label>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <label>description</label>
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <button type="submit">Create Project</button>
      </form>
    );
  }
}

export default AddProject;
