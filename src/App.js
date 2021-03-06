import React, { Component } from "react";
import Container from "./components/Container";
import Row from "./components/Row";
import Col from "./components/Col";
import { Table, TableRow } from "./components/Table";
import API from "./utils/API";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [{}],
      filteredEmployees: [{}],
      sortColumn: "",
      filter: false,
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
    if (nameEntry) {
      const employeeFilter = this.state.employees.filter(employee => employee.name === nameEntry);
      this.setState({ 
        filteredEmployees: employeeFilter,
        //employees: employeeFilter,
        filter: true
      });
    } else {
      this.setState({
        filter: false
      });
    }
  };

  handleSort = event => {
    if (this.state.sort === false) {
      this.setState({sortColumn: event.target.value, sort: true});
      let col = this.state.sortColumn;
      let sortedEmployees = [...this.state.employees];
      
      if (col === "name") {
          sortedEmployees.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          this.setState({ employees: sortedEmployees });
      // } else if (col === "id") {
      //     sortedEmployees.sort((a, b) => {
      //       let newA = a.id.replace(/-/g,"");
      //       let newB = b.id.replace(/-/g,"");
      //       console.log(newA);
      //       if (newA < newB) { return -1; }
      //       if (newA > newB) { return 1; }
      //       return 0;
      //     });
      //     this.setState({ employees: sortedEmployees });
      } else {
        sortedEmployees.sort((a, b) => {
          if (a.email < b.email) { return -1; }
          if (a.email > b.email) { return 1; }
          return 0;
        });
        this.setState({ employees: sortedEmployees });
      }
    }
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
                  <button className="btn btn-outline-secondary" type="button" id="button-clear" 
                    onClick={() => this.setState({ filter: false })}
                  >Clear Filter</button>
              </div>
            </Col>
            <Col size="md-3">
              <div className="input-group">
                <select 
                  className="form-select" 
                  id="sort-options" 
                  aria-label="Select with button addon"
                  value={this.state.sortColumn}
                  onChange={this.handleSort}>
                    <option selected>Sort by Column</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                </select>
                {/* <button 
                  className="btn btn-outline-secondary" type="button"
                >Sort</button> */}
              </div>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <Table>
                {this.state.filter ?  
                  (this.state.filteredEmployees.map(employee => (
                    <TableRow key={employee.id}
                      name={employee.name}
                      id={employee.id}
                      email={employee.email}
                      phone={employee.phone}
                    />
                  ))) : 
                  (this.state.employees.map(employee => (
                    <TableRow key={employee.id}
                      name={employee.name}
                      id={employee.id}
                      email={employee.email}
                      phone={employee.phone}
                    />
                  ))) }
              </Table>  
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
