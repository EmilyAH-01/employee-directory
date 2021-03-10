import React, { Component } from "react";

class Sort extends Component {
    state = {
        unsortedEmployees: [{}],
        sortedEmployees: [{}],
        filter: false,
        sort: true
    }

    handleSort() {
        return null;
    }

    render() {
        return (
            <div className="input-group">
                <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                    <option selected>Choose Column</option>
                    <option value="1">Name</option>
                    <option value="2">Id</option>
                    <option value="3">Email</option>
                    <option value="4">Phone Number</option>
                </select>
                <button className="btn btn-outline-secondary" type="button" onClick={this.handleSort()}>Sort</button>
            </div>
        );
    }
}

export default Sort;