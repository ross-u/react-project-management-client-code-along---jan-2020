# React | Integrating the React App

After this lesson, you will be able to:

- Make a request to a REST API using `axios`
- Understand how to integrate backend and frontend parts of your application

In this lesson, we will build a `React` application to consume our REST API.

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">1</h2>

#### Let’s start with creating the React app using CLI command:

```bash
npx create-react-app project-management-client

cd project-management-client
```

<br>

We already updated the port where our server side is running-we changed it from `3000` to `5000`, so we have:

- `project-management-server` runs on `http://localhost:5000`
- `project-management-client` runs on `http://localhost:3000`

<br>

### Install `axios` for http requests and `react-router-dom`

```bash
npm install axios react-router-dom --save
```

<br>

### Create folders for the components

```bash
mkdir src/components
mkdir src/components/projects
mkdir src/components/navbar
mkdir src/components/tasks
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">2</h2>

#### Add styles to the app

Before we start, let's add some basic styles to our app in `src/App.css`.

##### `src/App.css`

```css
/* 
    src/App.css 
*/

.App {
  text-align: center;
  padding: 0;
}

.nav-style {
  background: slateblue;
  display: flex;
  align-items: center;
  padding-top: 10px;
  font-size: 20px;
  margin-bottom: 20px;
}

form {
  padding: 10px 50px;
  border: 2px solid black;
  border-radius: 8px;
  display: inline-flex;
  flex-direction: column;
}

input {
  height: 30px;
  font-size: 18px;
  text-align: center;
}

button {
  width: 150px;
  padding: 5px 20px;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 16px;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.project,
.task {
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 7px;
  max-width: 700px;
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">3</h2>

#### Setup the `<Router>` in `index.js`

##### `src/index.js`

```jsx
// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter as Router } from "react-router-dom"; // <-- IMPORT

ReactDOM.render(
  // <-- ADD THE ROUTER
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// ...
registerServiceWorker();
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">4</h2>

### Create `<AddProject />` component.

##### `src/components/projects/AddProject.js`

```jsx
// src/components/projects/AddProject.js

import React, { Component } from "react";
import axios from "axios";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
  }

  handleFormSubmit = event => {};

  handleChange = event => {};

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.handleChange(e)}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">5</h2>

#### Let's create the methods `handleFormSubmit` and `handleChange`

##### `src/components/projects/AddProject.js`

```jsx
// src/components/projects/AddProject.js

//	...

handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
};

handleFormSubmit = event => {
  event.preventDefault();
  const { title, description } = this.state;

  axios
    .post("http://localhost:5000/api/projects", { title, description })
    .then(() => {
      // this.props.getData();
      this.setState({ title: "", description: "" });
    })
    .catch(err => console.log(err));
};

//	...

//	...
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">6</h2>

### Create a `<ProjectList />` component

##### `src/App.js`

```jsx
// src/components/projects/ProjectList.js

import React, { Component } from "react";

import { Link } from "react-router-dom"; // <== IMPORT
import axios from "axios"; // <== IMPORT

import AddProject from "./AddProject"; // <== IMPORT

class ProjectList extends Component {
  state = {
    listOfProjects: []
  };

  render() {
    return (
      <div id="project-list">
        <AddProject /> {/*   <===     ADD        */}
        <div>{/* HERE WE DISPLAY ALL OF THE PROJECTS FROM API */}</div>
      </div>
    );
  }
}

export default ProjectList;
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">7</h2>

### Update the `<ProjectList />` component

### and create method to get projects from the server

##### `src/components/projects/ProjectList.js`

```jsx
// src/components/projects/ProjectList.js

//	...

//			...

class ProjectList extends Component {
  //		...

  //			...

  getAllProjects = () => {}; // <--  ADD

  componentDidMount() {
    // <--  ADD
    this.getAllProjects();
    //  fetch the data from API before initial render, and save it in the state
  }

  render() {
    const { listOfProjects } = this.state; //  <--  ADD

    return (
      <div>
        <AddProject getData={this.getAllProjects} />{" "}
        {/*    // <-- UPDATE     */}
        {/* After adding a project, we will GET all projects again from API */}
        <div>
          {listOfProjects.map((
            project //   <-- ADD
          ) => (
            <div key={project._id} className="project">
              <Link to={`/projects/${project._id}`}>
                <h3>{project.title}</h3>
                <p>{project.description} </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProjectList;
```

<br>

#### Finish the method `getAllProjects()` in `<ProjectList>`

##### `src/components/projects/ProjectList.js`

```jsx
// src/components/projects/ProjectList.js

//	...

getAllProjects = () => {
  axios.get(`http://localhost:5000/api/projects`).then(apiResponse => {
    this.setState({ listOfProjects: apiResponse.data });
  });
};
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">8</h2>

### Import `<ProjectList />` and render it in `App.js`

##### `src/App.js`

```jsx
// 	src/App.js

//	...

//			...

import { Switch, Route } from "react-router-dom"; //	<--  ADD
import ProjectList from "./components/projects/ProjectList"; //		<--  ADD

function App() {
  return (
    <div className="App">
      <Switch>
        {" "}
        {/* ADD */}
        <Route exact path="/projects" component={ProjectList} /> {/* ADD */}
      </Switch>
    </div>
  );
}

// ...
```

<br>

#### Start the server before running react app.

#### Run the app `npm start` which will open the React app in the browser.

#### Using a created form submit a new Project.

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">9</h2>

### `//` Uncomment the line in `AddProject.js` - `this.props.getData()` passed from the parent component.

###

### It gets all projects every time new project is posted to the API.

##### `src/components/projects/AddProject`

```jsx
// src/components/projects/AddProject.js

//	...

//	...

handleFormSubmit = event => {
  event.preventDefault();
  const { title, description } = this.state;

  axios
    .post("http://localhost:5000/api/projects", { title, description })
    .then(() => {
      this.props.getData(); //		   ⟸  UNCOMMENT THIS LINE * *

      this.setState({ title: "", description: "" });
    })
    .catch(error => console.log(error));
};

//	...

//	...
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">10</h2>

#### Create a `<ProjectDetails />` component

##### `src/components/projects/ProjectDetails.js`

```jsx
// src/components/projects/ProjectDetails.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ProjectDetails extends Component {
  state = {};

  render() {
    return <h1>Welcome to the project details page!</h1>;
  }
}

export default ProjectDetails;
```

<br>

#### Create `<Navbar>` component

##### `src/components/navbar/Navbar.js`

```jsx
// src/components/navbar/Navbar.js

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav-style">
      <ul>
        <li>
          <Link to="/projects"> Projects </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

<br>

### Update `App.js`

##### `src/App.js`

```jsx
//	src/App.js

//	...

//			...

import ProjectList from "./components/projects/ProjectList";
import Navbar from "./components/navbar/Navbar"; //	ADD
import ProjectDetails from "./components/projects/ProjectDetails"; //	ADD

function App() {
  return (
    <div className="App">
      <Navbar /> {/* ADD */}
      <Switch>
        <Route exact path="/projects" component={ProjectList} />
        <Route exact path="/projects/:id" component={ProjectDetails} /> {/* ADD */}
      </Switch>
    </div>
  );
}

export default App;
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">11</h2>

#### Update `<ProjectDetails>` to add functionality

##### `src/components/projects/ProjectDetails.js`

```jsx
// src/components/projects/ProjectDetails.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ProjectDetails extends Component {
  state = {
    // <-- UPDATE / ADD THE STATE
    title: " ",
    description: " ",
    tasks: []
  };

  componentDidMount() {
    // <-- ADD
    this.getSingleProject();
  }

  getSingleProject = () => {
    // <-- ADD
    /* here we do a GET request and then set the state */
  };

  render() {
    // <-- ADD
    return (
      <div>
        <h1>{this.state.title}</h1>
        <h4>{this.state.description}</h4> {/*       // <--- UPDATE           */}
        <Link to={"/projects"}>
          <button>Back</button>
        </Link>
      </div>
    );
  }
}

export default ProjectDetails;
```

<br>

#### Finalize `getSingleProject()` method in `<ProjectDetails>`

##### `src/components/projects/ProjectDetails.js`

```jsx
// src/components/projects/ProjectDetails.js

//	...

//	...

getSingleProject = () => {
  const { id } = this.props.match.params;

  axios
    .get(`http://localhost:5000/api/projects/${id}`)
    .then(apiResponse => {
      const theProject = apiResponse.data;
      this.setState(theProject);
    })
    .catch(err => console.log(err));
};

//	...

//	...
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">12</h2>

#### Create `EditProject.js` component with a form to update a specific project.

##### `src/components/projects/EditProject.js`

```jsx
// src/components/projects/EditProject.js

import React, { Component } from "react";
import axios from "axios";

class EditProject extends Component {
  state = {
    title: "",
    description: ""
  };

  handleFormSubmit = event => {};

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    //                 ▲   Assign value to property using "object bracket notataion"
    //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label>Description:</label>

          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditProject;
```

<br>

#### Finalize `handleFormSubmit` in `EditProject.js`

##### `src/components/projects/EditProject.js`

```jsx
// src/components/projects/EditProject.js

//	...

//	...

handleFormSubmit = event => {
  event.preventDefault();
  const { title, description } = this.state;
  const { _id } = this.props.theProject;

  axios
    .put(`http://localhost:5000/api/projects/${_id}`, { title, description })
    .then(() => {
      this.props.getTheProject(); //  <---  hmmm
      // this.props.history.push('/projects');
      // after submitting the form, we could also redirect to '/projects'
    })
    .catch(err => console.log(err));
};

//	...

//	...
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">13</h2>

#### Place component `<EditProject>` in the `ProjectDetails.js`

##### `src/components/ProjectDetails.js`

```jsx
// src/components/projects/ProjectDetails.js

//	...

//	...






//	...

//			...

  renderEditForm = () => {
    /* Check if the `state` is not empty when`renderEditForm`
    is triggered before the state gets populated.
     If the state is empty nothing can be passed to `EditProject` as the
    value in `theProject` prop to populate the form  */
    if (!this.state.title  && !this.state.description) return null;
    else {
      return (
        <EditProject
          theProject={this.state}
          getTheProject={this.getSingleProject}
          {...this.props}
         />
       // {...this.props}  so that we can use 'this.props.history' in EditProject
      )
    }
  }



//  ...

//	  	...

    render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <h4>{this.state.description}</h4>
        <Link to={'/projects'}>
          <button>Back</button>
         </Link>

        <div>{this.renderEditForm()} </div>   				{/* ADD */}
      </div>
    )
  }
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">14</h2>

#### Update `ProjectDetails.js` and create the additional method for making DELETE requests to the API.

##### `src/components/projects/ProjectDetails.js`

```jsx
// src/components/projects/ProjectDetails.js

//	...

//	...

// DELETE PROJECT:

deleteProject = () => {
  const { id } = this.props.match.params;

  axios
    .delete(`http://localhost:5000/api/projects/${id}`)
    .then(() => this.props.history.push("/projects")) // causes Router URL change
    .catch(err => console.log(err));
};

//       UPDATE  -  ADD TO `render()`

//  ...
//  		...

<button onClick={() => this.deleteProject()}>Delete project</button>;
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">15</h2>

### Create `AddTask` component

##### `src/components/tasks/AddTask.js`

```jsx
// src/components/tasks/AddTask.js

import React, { Component } from "react";
import axios from "axios";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", isShowing: false };
  }

  handleFormSubmit = event => {};

  toggleForm = () => this.setState({ isShowing: !this.state.isShowing });

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleForm}> Add task </button>

        {!this.state.isShowing ? null : (
          <div>
            <form>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={e => this.handleChange(e)}
              />

              <input
                name="description"
                placeholder="Description"
                value={this.state.description}
                onChange={e => this.handleChange(e)}
              />

              <button onClick={this.handleFormSubmit}>Submit</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default AddTask;
```

<br>

#### Finalize `handleFormSubmit` method in `AddTask.js`

##### `src/components/tasks/AddTask.js`

```jsx
// components/tasks/AddTask.js

//	...

//	...

handleFormSubmit = event => {
  event.preventDefault();
  const { title, description } = this.state;
  const { projectId } = this.props;

  // we need to know to which project the task belongs,
  // therefore we get it's 'id'

  axios
    .post("http://localhost:5000/api/tasks", { title, description, projectId })
    .then(() => {
      // after form submit, GET project again to display the updated task list
      this.props.getUpdatedProject();
      this.setState({ title: "", description: "" });
    })
    .catch(error => console.log(error));
};

//	...

//	...
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">16</h2>

#### Add component `<AddTask />` to the `ProjectDetails.js`

##### `src/components/projects/ProjectDetails.js`

```jsx
// src/components/projects/ProjectDetails.js

//	...

//	...

import AddTask from "./../tasks/AddTask";

//	...

//				...

// Create helper/rendering function
renderAddTaskForm = () => {
  if (!this.state.title && !this.state.description) return null;
  else {
    return (
      <AddTask
        projectId={this.state._id}
        getUpdatedProject={this.getSingleProject}
      />
    );
  }
};

//	...

//			...

// INSIDE `render()` put `renderAddTaskForm`
// as the last thing before closing the

<button onClick={() => this.deleteProject()}>Delete project</button>;

{
  this.renderAddTaskForm();
}
{
  /* Render AddTask form  */
}

//	...

//	...
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">17</h2>

### Render All the tasks - Update `ProjectDetails.js`

##### `src/components/projects/ProjectDetails.js`

```jsx
// src/components/projects/ProjectDetails.js

//	...

//			...

{
  /*					INSIDE OF THE `render`						*/
}

{
  this.renderAddTaskForm();
}

// AFter the last line of code, render list of tasks

{
  this.state.tasks.length === 0 ? (
    <h2>NO TASKS TO DISPLAY</h2>
  ) : (
    this.state.tasks.map(task => {
      return (
        <Link
          key={task._id}
          to={`/projects/${this.state._id}/tasks/${task._id}`}
        >
          <div className="task">
            <h2>{task.title}</h2>
          </div>
        </Link>
      );
    })
  );
}

//		...

//	...
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">18</h2>

#### Update routes, and create route to render `<TaskDetails>`

##### `src/App.js`

```jsx
// 	src/App.js

//	...

//	...

import TaskDetails from "./components/tasks/TaskDetails"; // 			<-- ADD

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/projects" component={ProjectList} />
          <Route exact path="/projects/:id" component={ProjectDetails} />

          {/* ADD - route to display task details */}
          <Route
            exact
            path="/projects/:id/tasks/:taskId"
            component={TaskDetails}
          />
          {/* ADD */}
        </Switch>
      </div>
    );
  }
}

export default App;
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">19</h2>

#### Create `<TaskDetails>` component

##### `src/components/tasks/TaskDetails.js`

```jsx
// components/tasks/TaskDetails.js

import React, { Component } from "react";
import axios from "axios";

class TaskDetails extends Component {
  state = {};

  componentDidMount() {
    this.getTheTask();
  }

  getTheTask = () => {
    const { id, taskId } = this.props.match.params;
    axios
      .get(`http://localhost:5000/api/projects/${id}/tasks/${taskId}`)
      .then(apiResponse => {
        const theTask = apiResponse.data;
        this.setState(theTask);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h3>TASK DETAILS</h3>
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>

        {/* To go back we use react-router-dom method `history.goBack()` available on `props` object */}
        <button onClick={this.props.history.goBack}>Go Back</button>
      </div>
    );
  }
}

export default TaskDetails;
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">20</h2>

### NEXT STEPS:

- Create `<EditTask>` component which makes a `PUT` request to the API to update the task.

  - Render the `<EditTask>` component inside of `<TaskDetails>` .

* Create a delete button in the `<TaskDetails>` which calls a function to send `DELETE` request via axios to the API (deletes the task by id), and then does a new `GET`request to get the updated project and it's tasks (you can reuse the function from `<ProjectDetails>` `getSingleProject()`, by passing it as a prop ).
