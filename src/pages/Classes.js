import React, { Component } from 'react';
import "../css/classes.css";

class Classes extends Component {
    state = {
        json:null
    }

    componentWillMount(){
        
        fetch('classes.json')
        .then((res) => res.json())
        .then((json) => {
            this.setState({json})
        })
    }

    addDashes(text){
        let str = text.replace(/\s+/g, '-').toLowerCase();
        //console.log(str); 
        return str;
    }

    render() {
        console.log(this.state.json)
        return (
            <div className="Classes">
                <div className="container">

                    <div className="introduction">
                        <h1>Classes</h1>
                        <p>There will be a total of 40 sub-classes all within their neiche of class domain and class.</p>
                        <p>(*) Classes that will be released later on to ensure that the first 20 are balanced.</p>
                        <p>(**) Classes that are not definate at all.</p>
                    </div>

                    {
                        this.state.json != null ?
                        this.state.json.map((order) => (
                            <div className={"man " + this.addDashes(order.order)}>
                                <div className="toggle-class"><i onClick={(e) => {this.toggleClass(this.addDashes(order.order)+"-class",e)}} className="fas fa-chevron-circle-down"></i></div>
                                    <h2>{order.order}</h2>
                                    <p dangerouslySetInnerHTML={{__html: order.description}}>
                                        
                                    </p>
                                    <div id={this.addDashes(order.order)+"-class"} className="orderClass">
                                        {
                                            order.classes.map((orderClass)=>(
                                                <div className="class row">
                                                    <div className="col-md-4">
                                                        <h1>{orderClass.class}</h1>
                                                        <p dangerouslySetInnerHTML={{__html: orderClass.description}}>
                                                      
                                                        </p>
                                                        <ul>
                                                            {orderClass.points.map((point)=>(
                                                                <li>{point}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-8">
                                                        {
                                                            orderClass.subClasses.map((subclass)=>(
                                                                <div className="sub-class">
                                                                    <h3>{subclass.subClassName}</h3>
                                                                    <div className="sub-class-info">
                                                                        <div className="sub-class-image">
                                                                            <img alt="ff"/>
                                                                        </div>
                                                                        <div className="sub-class-description">
                                                                            <p dangerouslySetInnerHTML={{__html: subclass.description}}>
                                                                            </p>
                                                                            <ul>
                                                                                {
                                                                                    subclass.points.map((point)=>(
                                                                                        <li>{point}</li>
                                                                                    ))
                                                                                }
                                                                                <li>Roles
                                                                                    <ul>
                                                                                        {
                                                                                            subclass.roles.map((role)=>(
                                                                                                <li>{role}</li>
                                                                                            ))
                                                                                        }    
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>

                                                </div>
                                            ))
                                        }
                                        
                                    </div>
                            </div>
                        ))
                        :""
                    }
                </div>
            </div>
        );
    }


    toggleClass = (id,e) =>{
        
        if(!document.getElementById(id).classList.contains("toggled")){
            document.getElementById(id).classList.add("toggled");
            e.target.classList.add("toggled");
        }
        else {
            document.getElementById(id).classList.remove("toggled");
            e.target.classList.remove("toggled");
        }
    }
}

export default Classes;