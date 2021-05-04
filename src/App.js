import React, { Component } from "react";
import Container from "./components/Container";
import Row from "./components/Row";
import Col from "./components/Col";
import { Table, TableRow } from "./components/Table";
import API from "./utils/API";
import Filter from "./components/Filter";
import Sort from "./components/Sort";

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
    this.getEmployees("50");
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

  // handleFilter = name => {
  //   const employeeFilter = this.state.employees.filter(employee => employee.name !== name);
  //   this.setState({ 
  //     filteredEmployees: employeeFilter,
  //     filter: true 
  //   });
  // };
  
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
              <Filter/>
            </Col>
            <Col size="md-3">
              <Sort/>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <Table> 
                {this.state.employees.map(employee => (
                  <TableRow //key={employee.id}
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
