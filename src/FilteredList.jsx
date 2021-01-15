import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import DisplayList from './DisplayList.jsx';
import DisplayAgg from './DisplayAgg.jsx';
import Button from 'react-bootstrap/Button'
import './App.css';
class FilteredList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            attribute: 'All',
            role: 'All',
            sort: 'Name',
            agg: [  {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0},
                    {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0},
                    {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0},
                    {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0},
                    {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0}
                 ]
        };

        {/*bind functions we'll pass to child classes*/}
        this.addToAgg = this.addToAgg.bind(this)
        this.removeFromAgg = this.removeFromAgg.bind(this)
    }

    /*Add a hero to aggregator on the left pane*/
    addToAgg = (event) => {
        var i = 0
        var flag = 1;

        {/*Check if the added hero is already in the aggregator*/}
        while(i<5){
            if(this.state.agg[i].name === event.name){
                flag = 0;
                break;
            }
            i++;
        }
        i = 0;

        {/*Add new hero to aggregator*/}
        if(flag === 1){
            while(i<5){
                if(this.state.agg[i].name === 'None'){
                    var new_agg = this.state.agg;
                    new_agg[i] = event;
                    this.setState({
                        agg: new_agg
                    })
                    break;
                }
                i++;
            }
        }
    };

    /*remove hero from aggregator*/
    removeFromAgg = (event) => {
        if(event.name!=='None'){
            var i = 0;
            while(i<5){
                if(this.state.agg[i].name === event.name){
                    var new_agg = this.state.agg;

                    /*Shift all item in aggregator upward*/
                    var j = i;
                    for(j = i;j<4;j++){
                        new_agg[j] = new_agg[j+1]
                    }
                    new_agg[4] = {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0};
                    this.setState({
                        agg: new_agg
                    })
                    break;
                }
                i++;
            }
        }
    };

    /*Revert aggregator back to original state when clear button is pressed*/
    onClickClearAgg = () =>{
        this.setState({
            agg: [  {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0},
                    {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0},
                    {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0},
                    {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0},
                    {name:'None', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV38Oz7LDyy6IjxEG0GaMQ5yJQjAi4IH8cg&usqp=CAU', advantage: 0}
                 ]
        })
    }

    /*Change Filter Attribute State*/
    onSelectFilterAttribute = event => {
        this.setState({
            attribute: event
        })
    };

    /*Filter Attribute*/
    matchesFilterAttribute = item => {
        // all items should be shown when no filter is selected
        if(this.state.attribute === 'All') { 
            return true
        } else if (this.state.attribute === item.attribute) {
            return true
        } else {
            return false
        }
    }

    /*Change Filter Role State*/
    onSelectFilterRole = event => {
        this.setState({
            role: event
        })
    };

    /*Filter Role*/
    matchesFilterRole = item => {
        // all items should be shown when no filter is selected
        if(this.state.role === 'All') { 
            return true
        } else if (this.state.role === item.role) {
            return true
        } else {
            return false
        }
    }
    
    /*Change Sorting State*/
    onSelectSort = event => {
        this.setState({
            sort: event
        })
    };

    /*Comparison function for sorting*/
    compare_for_sort = (item1, item2) => {
        // all items should be shown when no filter is selected
        if(this.state.sort === 'Name') { 
            if (item1.name < item2.name) {
                return -1;
            }
            if (item1.name > item2.name) {
                return 1;
            }
            else{
                return 0;
            }
        } else if (this.state.sort === 'Advantage_2') {
            return item1.advantage-item2.advantage
        } 
        else if (this.state.sort === 'Advantage_1') {
            return item2.advantage-item1.advantage
        } else {
            return 0
        }
    }


    render(){
        return (
            <>
            {/*Left Pane contains Aggregator*/}
            <div className = 'LeftPane'>
                {/*Clear Aggregator Button*/}
                <Button variant="danger" onClick={this.onClickClearAgg}> Clear Draft</Button>

                <DisplayAgg list={this.state.agg} removeFromAgg = {this.removeFromAgg}/>
            </div>

            {/*Right Pane contains all the cards and filtering/sorting options*/}
            <div className = 'RightPane'>
                {/*Filter Attribute bar*/}
                <Navbar bg="dark" variant="dark" style={{ fontSize: '1.2vw', paddingBottom: '5px', paddingTop: '5px'}}>
                    <Navbar.Brand>Attribute</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Item><Nav.Link eventKey="All" onSelect={this.onSelectFilterAttribute}>All</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="STR" onSelect={this.onSelectFilterAttribute}>Str</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="AGI" onSelect={this.onSelectFilterAttribute}>Agi</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="INT" onSelect={this.onSelectFilterAttribute}>Int</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar>

                {/*Filter Role bar*/}
                <Navbar bg="dark" variant="dark" style={{ fontSize: '1.2vw', paddingBottom: '5px', paddingTop: '5px'}}>
                    <Navbar.Brand>Role</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Item><Nav.Link eventKey="All" onSelect={this.onSelectFilterRole}>All</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="Core" onSelect={this.onSelectFilterRole}>Core</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="Support" onSelect={this.onSelectFilterRole}>Support</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar>

                {/*Sort bar*/}
                <Navbar bg="dark" variant="dark" style={{ fontSize: '1.2vw', paddingBottom: '5px', paddingTop: '5px'}}>
                    <Navbar.Brand>Sort</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Item><Nav.Link eventKey="Name" onSelect={this.onSelectSort}>Name</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey= "Advantage_1" onSelect={this.onSelectSort}>Advantage</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey= "Advantage_2" onSelect={this.onSelectSort}>Disadvantage</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar>

                {/*Display items according to filtering&sorting option*/}
                <div className = 'CardPane'>
                    <DisplayList list={this.props.list.filter(this.matchesFilterAttribute).filter(this.matchesFilterRole).sort(this.compare_for_sort)} addToAgg = {this.addToAgg}/>
                </div>
            </div> 
          </>
        );
    }
  }
export default FilteredList;