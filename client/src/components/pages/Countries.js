import React, { Component } from 'react';
import api from '../../api';

class Countries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }
  componentDidMount() {
    api.getCountries()
      .then(countries => {
        console.log(countries)
        this.setState({
          countries: countries
        })
      })
      .catch(err => console.log(err))
  }
  handleDelete(id) {
    console.log("handleDelete");
    api.deleteCountry(id)
      .then(data => {
        if (data.success) {
          this.setState({
            countries: this.state.countries.filter(c => c._id !== id)
          })
        }
      })
  }
  render() {
    return (
      <div className="Countries">
        <h2>List of countries</h2>
        <table style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Capitals</th>
              <th>Area</th>
              <th>Creator</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.countries.map((c) => <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.capitals}</td>
              <td>{c.area}</td>
              <td>{c._creator ? c._creator.username : "?"}</td>
              <td><button onClick={e => this.handleDelete(c._id)}>Delete</button></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Countries;
