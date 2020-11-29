import React from 'react';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
class DisplayAgg extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        var mysum = 0;
        {/* Calculate total advantage from aggregator*/}
        var i = 0;
        for(i = 0; i < 5; i++){
            if(this.props.list[i]!=='None'){
                mysum = mysum+this.props.list[i].advantage
            }
        }
        return (
            <>
            {/* Display Total Advantage against AntiMage*/}
            <Container style={{color: 'black', backgroundColor:'lightgrey'}}>
                <h3>Total Advantage</h3>
                <p>
                {mysum.toFixed(2)}%
                </p>
            </Container>

            {/*Display Hero in aggregator photos and remove button*/}
            {this.props.list.map(item => 
                <div style={{ width:'100%', height: 'calc(16vh - 16px)', display:'flex',flexDirection:'row',alignItems:'center',justifyItems:'center',justifyContent:'center',alignContent:'Center' }}>
                    <Image src={item.image} thumbnail style={{ width:'35%', height: '75%'}}/>
                    <Button variant="primary" onClick={(e) => this.props.removeFromAgg(item, e)} style={{ width:'80px', height: '42px'}}> Remove </Button>
                </div>
            )}
            </>
        );
    }
}
export default DisplayAgg;