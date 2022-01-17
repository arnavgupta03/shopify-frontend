import ImageCard from "../components/ImageCard"
import React from "react";
import Spinner from "react-bootstrap/Spinner"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page_loaded: false,
            image_array: [],
            liked_image_array: [],
            liked_image_desc: [],
            liked_image_title: [],
            liked_image_date: [],
            show_liked: false,
            liked_images_set: false
        };

        //bind like onclick function
        this.handleViewLiked = this.handleViewLiked.bind(this);
    }

    componentDidUpdate() {
        if (this.state.show_liked && this.state.liked_images_set)
        {
            var liked_images = [];
            var liked_images_desc = [];
            var liked_images_title = [];
            var liked_images_date = [];

            if (localStorage.getItem("likedImages") === null)
            {
                localStorage.setItem("likedImages", "");
                localStorage.setItem("likedImageDesc", "");
                localStorage.setItem("likedImageTitle", "");
                localStorage.setItem("likedImageDate", "");
            }
            else
            {
                liked_images = localStorage.getItem("likedImages").split(",");
                liked_images_desc = localStorage.getItem("likedImageDesc").split("~");
                liked_images_title = localStorage.getItem("likedImageTitle").split("~");
                liked_images_date = localStorage.getItem("likedImageDate").split("~");
            }

            this.setState({liked_images_set: false, liked_image_array: liked_images, liked_image_date: liked_images_date, liked_image_desc: liked_images_desc, liked_image_title: liked_images_title});
        }
    }

    componentDidMount() {
        var liked_images = [];
        var liked_images_desc = [];
        var liked_images_title = [];
        var liked_images_date = [];

        if (localStorage.getItem("likedImages") === null)
        {
            localStorage.setItem("likedImages", "");
            localStorage.setItem("likedImageDesc", "");
            localStorage.setItem("likedImageTitle", "");
            localStorage.setItem("likedImageDate", "");
        }
        else
        {
            liked_images = localStorage.getItem("likedImages").split(",");
            liked_images_desc = localStorage.getItem("likedImageDesc").split("~");
            liked_images_title = localStorage.getItem("likedImageTitle").split("~");
            liked_images_date = localStorage.getItem("likedImageDate").split("~");
        }

        fetch("https://api.nasa.gov/planetary/apod?count=20&api_key=s7uqRhZOYnUB9trgP02xD2pGJv0WMtde3Iu94flJ")
            .then(response => response.json())
            .then(data => this.setState({page_loaded: true, image_array: data, liked_image_array: liked_images, liked_image_date: liked_images_date, liked_image_desc: liked_images_desc, liked_image_title: liked_images_title}));//this.setState({image_array: data}))
            // .then(() => console.log(this.state.image_array));
    }

    handleViewLiked() {
        console.log(this.state.liked_image_array);
        this.setState({show_liked: !this.state.show_liked, liked_images_set: true});
    }

    render() {
        return this.state.page_loaded 
                    ? (this.state.show_liked ?
                        (
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <h1 className="display-3 text-center">Liked Images</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <button className="btn btn-outline-dark" onClick={this.handleViewLiked}>View assorted images</button>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-sm-8 col-md-4">
                                        {
                                            this.state.liked_image_array.map((item, index) => {
                                                return (item !== "") ? <div key={index} className="row"><ImageCard keyNum={index} link={item} desc={this.state.liked_image_desc[index]} imgTitle={this.state.liked_image_title[index]} likeStatus='1' date={this.state.liked_image_date[index]}/></div> : <div></div>;
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <h1 className="display-3 text-center">Assorted Images from NASA's APOD</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <button className="btn btn-outline-dark" onClick={this.handleViewLiked}>View your liked images</button>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-sm-8 col-md-4">
                                        {
                                            this.state.image_array.map((item, index) => {
                                                return (item.media_type === "image") ? <div key={index} className="row"><ImageCard keyNum={index} link={item.url} desc={item.explanation} imgTitle={item.title} date={item.date}/></div> : <div></div> ;
                                            })
                                        }
                                    </div>
                                </div>
                            </div>))
                    : (
                            <div className="row justify-content-center">
                                <div className="text-center col">
                                    <Spinner className="mt-5" animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                    <p className="lead mb-5">We're just loading!</p>
                                </div>
                            </div>)
    }
}

export default Home;