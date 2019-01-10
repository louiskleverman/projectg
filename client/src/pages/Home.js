import React, { Component } from 'react';
import "../css/home.css"
import NewsFeed from "../components/NewsFeed.js"

class Home extends Component {
    state = {

    }

    render() {
        return (
            <div className="home">
                <div className="container">
                    <div className="introduction">
                        <h1>Welcome to Project G</h1>
                        <p className="subtitle">Where all the info on the best upcomming MMO-RPG will appear</p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium nisi venenatis, vehicula orci id, congue nulla. 
                        Vestibulum ac ipsum odio. Cras vestibulum tempus arcu, ac ornare mi gravida at. Donec nibh ipsum, 
                        malesuada eget elit ac, vestibulum hendrerit felis. Sed vestibulum, ex vitae sodales posuere, massa arcu dictum metus, 
                        a lobortis tortor est molestie risus. Vestibulum in neque quis augue commodo pharetra eget luctus sapien.
                        </p>
                        
                        <div className="news">
                            <p className="subtitle">The most recent news</p>
                            <NewsFeed nbPosts={2} />
                        </div>
                    </div>

                </div> 
                <div className="box-node">
                    <div className="container">
                        <h2>Node system</h2>
                        <p>
                            Ut vehicula lectus elit, vel ultricies quam faucibus vitae. Sed pretium magna et elit varius accumsan. 
                            Morbi cursus mauris in dui volutpat, vitae tincidunt est pharetra. Donec lacinia tincidunt tellus non volutpat. 
                            Fusce maximus molestie molestie. Aliquam dictum, erat a venenatis congue, elit lectus eleifend nibh, vitae porta ex elit ut nulla. Cras venenatis aliquam enim at mollis.
                            Aliquam at lorem eu erat lacinia laoreet non eget libero. Integer nisl nisi, sagittis vitae leo ut, consequat vestibulum dolor.</p>
                    
                        <div className="row">
                            <div className="col-md-6">
                                <h3>How it works</h3>
                                <p>
                                Vivamus dapibus sem ac maximus tristique. Proin euismod vestibulum commodo. Nam accumsan maximus libero vel ullamcorper. Praesent eleifend sit amet diam non viverra. Nam blandit libero ut cursus porta. 
                                Phasellus placerat fringilla magna. Aliquam sit amet semper magna. Integer eget sollicitudin nisl. Suspendisse potenti. 
                                </p>
                            </div>
                            <div className="col-md-6">
                                <h3>PVP & Sieges</h3>
                                <p>
                                Praesent vulputate eleifend justo, quis mollis velit malesuada ut. Mauris consectetur dolor enim, non congue libero sollicitudin 
                                sed. Sed auctor, sapien eu malesuada pharetra, nunc turpis finibus ex, nec imperdiet purus augue id massa. Etiam arcu ante, auctor
                                 in congue venenatis, semper vel neque. Cras id arcu in quam mollis faucibus non non tortor.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;