import ImageCard from "../components/ImageCard"
import React from "react";
import Spinner from "react-bootstrap/Spinner"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page_loaded: false,
            image_array: []
        };
    }

    componentDidMount() {
        fetch("https://api.nasa.gov/planetary/apod?count=20&api_key=s7uqRhZOYnUB9trgP02xD2pGJv0WMtde3Iu94flJ")
            .then(response => response.json())
            .then(data => this.setState({page_loaded: true, image_array: data}));//this.setState({image_array: data}))
            // .then(() => console.log(this.state.image_array));
    }

    // api_info = fetch("https://api.nasa.gov/planetary/apod?count=10&api_key=s7uqRhZOYnUB9trgP02xD2pGJv0WMtde3Iu94flJ")
    //     .then(response => response.json());

    // console.log(api_info);

    render() {
        return this.state.page_loaded 
                    ? (
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1 className="display-3 text-center">Assorted Images from NASA's APOD</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-sm-8 col-md-4">
                                {
                                    this.state.image_array.map((item, index) => {
                                        return <div key={index} className="row"><ImageCard keyNum={index} link={item.url} desc={item.explanation} imgTitle={item.title} date={item.date}/></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>)
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