import React, {Component} from "react";
import { Modal, Button, Row, Col, Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export class EditDepModal extends Component{
    constructor(props){
        super(props);
        this.state={snackbaropen:false, snackbarmsg: ''};
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    
    snackbarClose = (event)=>{
        this.setState({snackbaropen:false});
    }
  
    handleSubmit(event){
        event.preventDefault();
        
        fetch('https://localhost:44319/api/Department',{
          method:'PUT' ,
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          } ,
          body:JSON.stringify({
            DepartmentID:event.target.DepartmentID.value,
            DepartmentName:event.target.DepartmentName.value
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
                  Edit Department
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>

                            <FormGroup controlId="DepartmentID">
                                <FormLabel>DepartmentID</FormLabel>
                                <FormControl
                                type="text"
                                name="DepartmentID"
                                required
                                disabled
                                defaultValue={this.props.depid}
                                placeholder="DepartmentID"
                                />                           
                            </FormGroup>

                            <FormGroup controlId="DepartmentName">
                                <FormLabel>DepartmentName</FormLabel>
                                <FormControl
                                type="text"
                                name="DepartmentName"
                                required
                                defaultValue={this.props.depname}
                                placeholder="DepartmentName"
                                />                           
                            </FormGroup>
                            <br></br>
                            <FormGroup>
                                <Button variant="primary" type="submit" >Update Department</Button> 
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