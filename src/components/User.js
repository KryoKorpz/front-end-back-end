import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';

import { getUser } from '../actions'


import '../css/\Notes.css';


class User extends Component {
    render() {
        return (
            <div className="notes">
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                    <Row >
                        {this.props.user.map((user) =>{
                            return(
                                <Col xs='auto'>
                                        <Card style={{display: 'flex'}}>
                                            <CardBody style={{border:'1px solid black'}} >
                                                <CardTitle style={{display: 'flex', justifyContent:'center'}}>{user.username}</CardTitle>
                                            </CardBody>
                                        </Card>
                                </Col>
                        )})}
                    </Row>
                    </div>
            </div>
      );
    }

    componentDidMount() {
        this.props.getUser();
    }
}
    
    const mapStateToProps = (state) => {
        return {
            user:state.user
        }
    }
    
  export default connect(mapStateToProps, {getUser})(User);

