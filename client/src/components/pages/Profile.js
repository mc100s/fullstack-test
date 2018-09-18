import React, { Component } from 'react';
import api from '../../api';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      pictureUrl: null
    }
  }
  handleChange(e) {
    console.log('handleChange');
    console.log('DEBUG e.target.files[0]', e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    api.addProfilePicture(this.state.file)
      .then(data => {
        if (data.success) {
          this.setState({
            pictureUrl: data.pictureUrl
          })
        }
      })
  }
  render() {
    return (
      <div className="Profile">
        <h1>My profile</h1>
        {this.state.username}
        <br />
        {this.state.pictureUrl && <img src={this.state.pictureUrl} />}
        {!this.state.pictureUrl && <img src="https://iupac.org/cms/wp-content/uploads/2018/05/default-avatar.png" />}

        <h2>New picture</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="file" onChange={(e) => this.handleChange(e)} /> <br />
          <button>Upload new picture</button>
        </form>
        <br />
        <br />
      </div>
    );
  }
  componentDidMount() {
    api.getProfile()
      .then(user => {
        this.setState({
          username: user.username,
          pictureUrl: user.pictureUrl
        })
      })
  }
}

export default Profile;
