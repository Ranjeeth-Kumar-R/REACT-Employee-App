import React, {Component} from "react";
import { Modal, Button, Row, Col, Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[],snackbaropen:false, snackbarmsg: ''};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('https://localhost:44319/api/Department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    snackbarClose = (event)=>{
      this.setState({snackbaropen:false});
    }

    handleSubmit(event){
      event.preventDefault();
      
      fetch('https://localhost:44319/api/Employee',{
        method:'POST' ,
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        } ,
        body:JSON.stringify({
          EmployeeID:null,
          EmployeeName:event.target.EmployeeName.value,
          Department:event.target.Department.value,
          MailID:event.target.MailID.value,
          DOJ:event.target.DOJ.value
        })
      })
      .then(res=> res.json())
      .then((result)=>
      {
        //alert(result);
        this.setState({snackbaropen: true , snackbarmsg:result});
      },
      (error)=>{
        //alert('Failed');
        this.setState({snackbaropen: true , snackbarmsg:'Failed'});
      }
      )
    }
    render(){
        return(
          <div className="container">
            <Snackbar
              anchorOrigin={{vertical:'center', horizontal:'center'}}
              open={this.state.snackbaropen}
              autoHideDuration={3000}
              onClose={this.snackbarClose}

              message={<span id='message'>{this.state.snackbarmsg}</span>}
              action={[
                <IconButton 
                  key="close"
                  arial-label="Close"
                  color="inherit"
                  onClick={this.snackbarClose}
                >x
                </IconButton>
              ]}
            />
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add Employee
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
                <Row>
                  <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup controlId="EmployeeName">
                        <FormLabel>EmployeeName</FormLabel>
                        <FormControl
                          type="text"
                          name="EmployeeName"
                          required
                          placeholder="EmployeeName"
                        />  
                          
                      </FormGroup>

                      <FormGroup controlId="Department">
                        <FormLabel>Department</FormLabel>
                        <FormControl as="select">
                            {this.state.deps.map(dep=>
                            <option key={dep.DepartmentID}>{dep.DepartmentName}</option>    
                            )}

                        </FormControl>
                          
                          
                          
                      </FormGroup>

                      <FormGroup controlId="MailID">
                        <FormLabel>MailID</FormLabel>
                        <FormControl
                          type="text"
                          name="MailID"
                          required
                          placeholder="MailID"
                        />  
                          
                      </FormGroup>

                      <FormGroup controlId="DOJ">
                        <FormLabel>DOJ</FormLabel>
                        <FormControl
                          type="datetime-local"
                          step="1"
                          name="DOJ"
                          required
                          placeholder="DOJ"
                        />  
                          
                      </FormGroup>
                      <br></br>
                      <FormGroup>
                        <Button variant="primary" type="submit" >Add Employee</Button> 
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
    }
}