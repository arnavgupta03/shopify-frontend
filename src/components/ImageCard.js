import React from "react";

class ImageCard extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            like_status: false,
        };

        this.handleLike = this.handleLike.bind(this);
    }

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
                </div>
            </div>
        );
    }
}

export default ImageCard;