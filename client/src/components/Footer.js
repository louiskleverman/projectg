import React, { Component } from 'react';
import "../css/footer.css";
// import { NavLink } from "react-router-dom";

class Footer extends Component {
    state = {
    
    }

    render() {
        return (
           <div id="footer">
                <div className="row">
                    <div className="col-md-4">
                        
                    </div>
                    <div className="col-md-4">
                        
                    </div>
                    <div className="col-md-4">
                        <h2><i className="icon far fa-envelope"></i> Contact us</h2>
                        <div className="contactForm row">
                            <div className="col-md-6">
                                <input type="text" placeholder="Name"/>
                            </div>
                            <div className="col-md-6">
                                <input type="email" placeholder="Email"/>
                            </div>
                            <div className="col-md-12">
                                <input type="text" placeholder="Email"/>
                            </div>
                            <div className="col-md-12">
                                <textarea placeholder="Message"></textarea>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default Footer;