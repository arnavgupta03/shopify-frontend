//import required libraries and components
import React from "react";

//component for image card
class ImageCard extends React.Component
{
    constructor(props) {
        super(props);
        //set initial state
        this.state = {
            like_status: false,
        };

        //bind like onclick function
        this.handleLike = this.handleLike.bind(this);
    }

    //handle like by toggling state
    handleLike() {
        this.setState(prevState => ({
            like_status: !prevState.like_status
        }))
    }

    render() {
        return (
            <div className="card my-2">
                <img src={this.props.link} className="card-img-top" alt={this.props.desc} />
                <div className="card-body">
                    <h3 className="card-title">{this.props.imgTitle}</h3>
                    <p className="card-text">{this.props.date}</p>
                    <button className="btn btn-primary" onClick={this.handleLike}>{this.state.like_status ? "Unlike" : "Like"}</button>
                    {/* <label for="disabledLink">Get a link to the image here!</label>
                    <input type="text" id="disabledLink" className="form-control" value={this.props.link}/> */}
                </div>
            </div>
        );
    }
}

//export component for home page
export default ImageCard;