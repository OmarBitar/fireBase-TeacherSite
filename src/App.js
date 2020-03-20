//componentFix branch
import React from 'react' 
import { db } from './services/firebase'

class App extends React.Component {

  constructor(props){
    super(props)
      this.state = {
        Students : [],
        submittedName: '',
        grade: 0,
        pass: false
      } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    
  }

  // GET document from DB
  componentDidMount(){    
    //get data from DB
    db.collection("students").get().then((snapshot) => { 
      let studentList = []
      snapshot.forEach((doc) => {  
          studentList.push(doc.data())
      })
      this.setState({Students: studentList})
    }).catch((error) => {
        console.log("Error getting document:", error);
    })   
  }

  // TODO: need to fix realtime update
  // GET REALTIME documents from DB
  componentDidUpdate(){
    db.collection("students").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges()
      let studentList = this.state.Students
      changes.forEach(change => { 
        if(changes.type == 'added'){
          studentList.push(change.doc)
        } else if (change.type == 'removed'){
          const index = studentList.indexOf(change.doc.id);
          if (index > -1) {
            studentList.splice(index, 1);
          }
        }
      }) 
      this.setState({Students: studentList})
    });
  }

  // ADD a new document to DB
  addNewStudent = () => {
    if(this.state.submittedName){
      db.collection('students').add({
        name: this.state.submittedName,
        grade: this.state.grade,
        classPass: this.state.pass
      }).then(ref => {
        console.log('Added document with ID: ', ref.id);
        alert("submitted to DB")
      });
    } else {
      alert("error")
    }
  }

  // DELETE a new document to DB
  deleteStudent = () => {
    if(this.state.submittedName){
      // search in DB for ID, then Delete
      db.collection("students").where("name", "==", this.state.submittedName)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {  
              db.collection("students").doc(doc.id).delete()
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  
      
      alert(this.state.submittedName + " was removed from DB")
    } else {
      alert("error")
    }
  }

  printData = () => {
    return(
      this.state.Students.map((person, index) => ( 
        <li key={index}> {person.name} --> grade: {person.grade}%</li>
     ))
    )
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val}); 
  }

  handleSubmit(event) {
    this.addNewStudent() 
    event.preventDefault();
  }

  handleDeleteSubmit(event) {
    this.deleteStudent() 
    event.preventDefault();
  }
 
  render() {  
    return (
      <div>  

      <h1>database list: </h1>
      <ol>
        {this.printData()}  
      </ol>

      <h1>add a student</h1>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name='submittedName' onChange={this.handleChange} />
          <br/>
          grade:
          <input type="text" name='grade' onChange={this.handleChange} />
          <br/>
          pass class:
          <select name='pass' onChange={this.handleChange}>
            <option value={false}>false</option> 
            <option value={true}>true</option>
          </select>
          <br/>
        </label>
        <input type="submit" value="Submit" />
      </form>

      <h1>remove a student</h1>
      <form onSubmit={this.handleDeleteSubmit}>
        <label>
          Name:
          <input type="text" name='submittedName' onChange={this.handleChange} />
          <br/>
        </label>
        <input type="submit" value="Submit" />
      </form>

      </div>
    )
  }
}
export default App