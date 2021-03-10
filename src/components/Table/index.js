import React from "react";
import "./style.css";

export function Table(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    );
}

export function TableRow(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.id}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
        </tr>
    );
}