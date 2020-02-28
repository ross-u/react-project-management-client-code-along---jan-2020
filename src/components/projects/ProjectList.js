import React, { Component } from "react";
import AddProject from "./AddProject";
import axios from "axios";

import { Link } from "react-router-dom";

export class ProjectList extends Component {
  state = {
    listOfProjects: []
  };

  getAllProjects = () => {
    axios
      .get("http://localhost:5000/api/projects")
      .then(response => {
        const listOfProjects = response.data;
        this.setState({ listOfProjects: listOfProjects });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    return (
      <div id="project-list">
        <AddProject getData={this.getAllProjects} />

        <div>
          {this.state.listOfProjects.map(project => {
            return (
              <div key={project._id} className="project">
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProjectList;
