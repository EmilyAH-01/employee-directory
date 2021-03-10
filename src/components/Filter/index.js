import React from "react";

function Filter(props) {

    return (
        <div className="input-group mb-3">
            <input 
                onChange={props.handleInputChange}
                value={props.value}
                id="search" 
                type="text" 
                className="form-control" 
                placeholder="Filter by Name" 
                aria-label="Employee name to filter by" 
                aria-describedby="button-addon2" 
            />

            <button 
                className="btn btn-outline-secondary" 
                type="button" 
                id="button-addon2" 
                onClick={props.handleFilter}
            >Filter</button>

        </div>
    );
}

export default Filter;