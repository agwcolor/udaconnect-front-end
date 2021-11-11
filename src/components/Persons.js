import React, { Component } from "react";
import Connection from "./Connection";

class Persons extends Component {
  constructor(props) {
    super(props);
    // TODO: endpoint should be abstracted into a config variable
    // Use localhost:5000 to run locally not in a docker container
    // Use localhost: 30001 in docker to test api already on kubernetes
    // Use http://10.43.240.203:5000 when deployed
    this.endpoint_url = "http://10.42.0.14:5000/api/persons";
    this.state = {
      persons: [],
      display: null,
    };
  }

  componentDidMount() {
    fetch(this.endpoint_url)
      .then((response) => response.json())
      .then((data) => this.setState({ persons: data }));
  }

  setDisplay = (personId) => {
    this.setState({
      persons: this.state.persons,
      display: personId,
    });
  };

  render() {
    return (
      <div className="lists">
        <div className="peopleBox">
          <div className="peopleHeader">People</div>
          <ul className="personList">
            {this.state.persons.map((person) => (
              <li
                key={person.id}
                onClick={() => {
                  this.setDisplay(person.id);
                }}
                className={
                  this.state.display === person.id
                    ? "selectedPerson"
                    : "personListItem"
                }
              >
                <div className="person">
                  {person.first_name} {person.last_name}
                </div>
                <div>
                  Company: <strong>{person.company_name}</strong>{" "}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Connection personId={this.state.display} />
      </div>
    );
  }
}
export default Persons;
