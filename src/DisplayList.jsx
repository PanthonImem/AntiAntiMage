import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
class DisplayList extends React.Component{

    render(){
        return (
            <>
            {/* Map each item to a display card*/}
            {this.props.list.map(item => 
                <>
                <Card style={{ width:'16.66%', minWidth:'200px', color:'white'}} bg='dark'>
                <Card.Img variant="top" src={item.image}/>
                <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle>
                    <Badge variant="secondary">{item.attribute}</Badge>{' '}<br/>
                    <Badge variant="primary">{item.role}</Badge>{' '}<br/>
                    Advantage: {item.advantage}%
                </Card.Subtitle>
                <Button variant="primary" onClick={(e) => this.props.addToAgg(item, e)}> Add to Draft</Button>
                </Card.Body>
                </Card>
                </>
            )}
            </>
        );
    }
}
export default DisplayList;
