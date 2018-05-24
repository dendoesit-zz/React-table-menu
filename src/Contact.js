import React, { Component } from "react";
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Modal from './Modal.js'



class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    isOpen: false,
      error: null,
      isLoaded: false,
      editing: false,
      items: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

  componentDidMount() {
    fetch("http://localhost:9999/students")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

handleChange(event) {
    this.setState({value: event.target.value});
}

handleSubmit(event) {
  event.preventDefault();
  fetch('http://localhost:9999/student/add?firstName=' + this.state.firstName +'&lastName=' + this.state.lastName + '&grade=' +this.state.grade, {
    method:'POST',})
    .then(function(response){
      alert('data has been sent')
      console.log(response);
    })
  this.setState({firstName : '' , lastName:'',grade:'',isOpen:false})
  (window.location.reload() )
}

deleteStudent(id){
    return fetch('http://localhost:9999/student/delete?id=' + id, {
        method: 'GET',})
    .then(res => res)
    .then(alert('Student removed')).then(window.location.reload())
}

editStudent(firstName,lastName,grade){
    console.log(firstName)
   this.setState({editing: true,firstName:firstName,lastName,lastName,grade:grade})
    console.log(this.state)
}

updateStudent(firstName,lastName){
    console.log(this.state)
    this.setState({editing:false})
    console.log(firstName,lastName)
    return fetch('http://localhost:9999/student/edit?id' + firstName, {method:'GET',})
    .then(res=> res)
    
}

  renderNormal() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
          return (
            <div>
                  <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                    <h2>Add Student</h2>
                    <form onSubmit={this.handleSubmit}> 
                    First Name : <input type="text" value={this.state.firstname} onChange={e => this.setState({ firstName: e.target.value })} />
                    Last Name : <input type="text" value={this.state.lastname} onChange={e => this.setState({ lastName: e.target.value })}></input>
                    Grade: <input type="number" value={this.state.grade} onChange={e => this.setState({ grade: e.target.value })}></input>
                    </form>
                  </Modal>
                  <table className="table">
                      <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Grades</th>
                        <th scope="col">Options</th>

                        </tr>
                      </thead>
                    <tbody><tr>
                        <td></td>
                        <td></td>
                        <td></td><td><button type="button" className="btn btn-success" onClick={this.toggleModal}>Add User</button></td></tr>
                    {items.map(item => (
                        <tr key={item.id}>
                    <td>{item.firstName}</td><td>{item.lastName}</td>
                        <td><button type="button" className="btn btn-primary"> Grades </button></td>
                        <td><button type="button" className="btn btn-primary" onClick={this.editStudent.bind(this, item.firstName,item.lastName,item.grade)} >Edit</button>
                    <button type="button" className="btn btn-danger" onClick={this.deleteStudent.bind(this, item.id)}>Delete</button></td>
                        </tr>    
                    ))} 
                    </tbody>
                  </table>
            </div>
          );
        }
    }
    renderEdit() {
        return(
            <div>
                <h1>Editing User</h1>    
                <p>{this.state.firstName}</p>
                <input text="name" value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value })}></input>
                <input text="name" value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })}></input>

                <button type="button" className="btn btn-primary" onClick={this.updateStudent.bind(this, this.state.firstName,this.state.lastName)}>Update User Information</button>
            </div> 
        )
    }
    render() {
    if (this.state.editing) {
      return this.renderEdit()
    } else {
      return this.renderNormal()
    }
  }
}
 
export default Contact;
