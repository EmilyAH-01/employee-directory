import React, { Component } from "react";
import Container from "./components/Container";
import Row from "./components/Row";
import Col from "./components/Col";
import { Table, TableRow } from "./components/Table";
import API from "./utils/API";
//import Filter from "./components/Filter";
//import Sort from "./components/Sort";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [{}],
      filteredEmployees: [{}],
      filter: false,
      sortedEmployees: [{}],
      sort: false
    }
  }

  // When component mounts, get 50 users
  componentDidMount() {
    this.getEmployees("500");
  }

  // Prevents the need for a nested map function to display nested objects 
  reformatApiResults = data => {
    for (let i=0; i<data.length; i++) {
      data[i].name = data[i].name.first + " " + data[i].name.last;
      data[i].id = data[i].id.value;
    }
    return data;
  };

  getEmployees = number => {
    API.getFromAPI(number)
      .then(res => {
          this.setState({ 
            employees: this.reformatApiResults(res.data.results) 
          })
      })
      .catch(err => console.log(err));
  };

  handleFilter = nameEntry => {
    const employeeFilter = this.state.employees.filter(employee => employee.name === nameEntry);
    this.setState({ 
      //filteredEmployees: employeeFilter,
      employees: employeeFilter,
      filter: true
    });
  };
  
  render() {
    return (
      <div>
        <Container style={{ marginTop: 30 }}>
          <Row>
            <Col size="md-12">
              <h1>Employee Directory</h1>
            </Col>
          </Row>
          <Row>
            <Col size="md-4 offset-md-5">
              <div className="input-group mb-3">
                  <input id="search" type="text" className="form-control" placeholder="Filter by Full Name" aria-label="Employee name to filter by" aria-describedby="button-addon2" />
                  <button className="btn btn-outline-secondary" type="button" id="button-addon2" 
                    onClick={() => this.handleFilter(document.getElementById("search").value)}
                  >Filter</button>
              </div>
            </Col>
            <Col size="md-3">
              <button className="btn btn primary">Sort</button>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <Table> 
                {this.state.employees.map(employee => (
                  <TableRow key={employee.id}
                    name={employee.name}
                    id={employee.id}
                    email={employee.email}
                    phone={employee.phone}
                  />
                ))}
              </Table>  
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
