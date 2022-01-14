function ImageCard(props)
{
    return (
        <div className="card my-2">
            <img src={props.link} className="card-img-top" alt={props.desc} />
            <div className="card-body">
                <h3 className="card-title">{props.imgTitle}</h3>
                <p className="card-text">{props.date}</p>
                <button className="btn btn-primary">Like</button>
            </div>
        </div>
    );
}

export default ImageCard;