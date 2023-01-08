import React,{ Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button , ButtonToolbar} from 'react-bootstrap';

import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';

export class Department extends Component{
    
    constructor(props){
        super(props);
        this.state={deps:[] , addModalShow: false , editModalShow: false}
    }

    componentDidMount(){
        this.refreshList(); 
    }

    refreshList(){
        fetch('https://localhost:44319/api/Department')
        .then(response => response.json())
        .then(data => {
            this.setState({deps:data});
        });
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm('Are you sure ?'))
        {
            fetch('https://localhost:44319/api/Department/'+depid,{
            method:'DELETE',
            header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }
            )
        }
    }
    

    render(){
        const {deps , depid , depname} =this.state;
        const b = {
            margin: '2%',
            
          };
        let addModalClose =()=>this.setState({addModalShow : false});
        let editModalClose =()=>this.setState({editModalShow : false});
        return(
            <div className="">   
                <Table className="mt-5" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep => 
                        <tr key={dep.DepartmentID}>
                            <td> {dep.DepartmentID} </td>
                            <td> {dep.DepartmentName} </td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="mr-2" style={b}
                                    variant='info'
                                    onClick={()=>this.setState({editModalShow:true,depid:dep.DepartmentID,depname:dep.DepartmentName})}
                                    >
                                        Edit
                                    </Button>

                                    <Button className="mr-2" style={b}
                                    onClick={()=> this.deleteDep(dep.DepartmentID)}
                                    variant="danger"
                                    >
                                        Delete
                                    </Button>
                                    <EditDepModal
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    depid={depid}
                                    depname={depname}
                                    />
                                </ButtonToolbar>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                        <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>
                            Add Department
                        </Button>
                        <AddDepModal
                            show={this.state.addModalShow}
                            onHide={addModalClose}
                        />

                        
                </ButtonToolbar>
            </div>
        )
    }

}