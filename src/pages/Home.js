import ImageCard from "../components/ImageCard"
import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image_array: []
        };
    }

    componentDidMount() {
        fetch("https://api.nasa.gov/planetary/apod?count=10&api_key=s7uqRhZOYnUB9trgP02xD2pGJv0WMtde3Iu94flJ")
            .then(response => response.json())
            .then(data => this.setState({image_array: data}));//this.setState({image_array: data}))
            // .then(() => console.log(this.state.image_array));
    }

    // api_info = fetch("https://api.nasa.gov/planetary/apod?count=10&api_key=s7uqRhZOYnUB9trgP02xD2pGJv0WMtde3Iu94flJ")
    //     .then(response => response.json());

    // console.log(api_info);

    render() {
        console.log(this.state.image_array);
        return (
            <div className="row justify-content-center">
                <div className="col-sm-8 col-md-4">
                    {
                        this.state.image_array.map((item, index) => {
                            return <div key={index} className="row"><ImageCard key={index} link={item.url} imgTitle={item.title} date={item.date}/></div>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Home;