//import required libraries and components
import React from "react";
import { OverlayTrigger } from "react-bootstrap";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

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

        //bind copy onclick function
        this.handleCopy = this.handleCopy.bind(this);
    }

    //handle like by toggling state
    handleLike() {
        var liked_images = localStorage.getItem("likedImages").split(",");
        var liked_images_date = localStorage.getItem("likedImageDate").split("~");
        var liked_images_desc = localStorage.getItem("likedImageDesc").split("~");
        var liked_images_title = localStorage.getItem("likedImageTitle").split("~");

        if (!this.state.like_status)
        {
            liked_images.push(this.props.link);
            liked_images_date.push(this.props.date);
            liked_images_desc.push(this.props.desc);
            liked_images_title.push(this.props.imgTitle);
        }
        else
        {
            liked_images = liked_images.filter(item => item !== this.props.link);
            liked_images_date = liked_images_date.filter(item => item !== this.props.date);
            liked_images_desc = liked_images_desc.filter(item => item !== this.props.desc);
            liked_images_title = liked_images_title.filter(item => item !== this.props.imgTitle);
        }

        localStorage.setItem("likedImages", liked_images.join());
        localStorage.setItem("likedImageDate", liked_images_date.join("~"));
        localStorage.setItem("likedImageDesc", liked_images_desc.join("~"));
        localStorage.setItem("likedImageTitle", liked_images_title.join("~"));

        this.setState(prevState => ({
            like_status: !prevState.like_status
        }))
    }

    //handle link copy
    handleCopy()
    {
        navigator.clipboard.writeText(this.props.link);

        var toast = document.createElement("toast");
        toast.innerHTML = '<Toast><Toast.Header> <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /><strong className="me-auto">Bootstrap</strong><small>11 mins ago</small></Toast.Header><Toast.Body>Hello, world! This is a toast message.</Toast.Body></Toast>';

    }

    render() {
        const popover = (
            <Popover id="popover-basic">
                <Popover.Body>
                Link copied!
                </Popover.Body>
            </Popover>
            );

        return (
            <div className="card my-2">
                <img src={this.props.link} className="card-img-top my-2" alt={this.props.imgTitle} />
                <div className="card-body">
                    <h3 className="card-title">{this.props.imgTitle}</h3>
                    <p className="card-text">{this.props.date}</p>
                    <div class="accordion" id={"accordion" + this.props.keyNum}>
                        <div class="accordion-item my-2">
                            <h2 class="accordion-header" id={"heading" + this.props.keyNum}>
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + this.props.keyNum} aria-expanded="false" aria-controls={"collapse" + this.props.keyNum}>
                                Explanation of this picture
                            </button>
                            </h2>
                            <div id={"collapse" + this.props.keyNum} class="accordion-collapse collapse" aria-labelledby={"heading" + this.props.keyNum} data-bs-parent={"#accordion" + this.props.keyNum}>
                            <div class="accordion-body">
                                <lead>{this.props.desc}</lead>
                            </div>
                            </div>
                        </div>
                    </div>
                    {(this.props.likeStatus !== '1') ? (<div className="row">
                        <div className="col">
                        <button className="btn btn-primary my-2" onClick={this.handleLike}>{this.state.like_status ? "Unlike" : "Like"}</button>
                        </div>
                    </div>) : <div></div>}
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <label for="disabledLink">Get a link to the image here!</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <input type="text" id="disabledLink" className="form-control" value={this.props.link}/>
                                </div>
                                <div className="col-4">
                                    <OverlayTrigger trigger={"click"} rootClose placement="right" overlay={popover}>
                                    <button className="btn btn-primary" onClick={this.handleCopy}>Copy</button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//export component for home page
export default ImageCard;