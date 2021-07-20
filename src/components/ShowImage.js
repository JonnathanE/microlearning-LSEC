import React from 'react';
import './ShowImage.css';

const ShowImage = ({ item, url }) => {
    return (
        <div className="product-img">
            <img
                src={url}
                alt={item.name}
                className="mb-3 img-cont"
                style={{ maxHeight: "600px", maxWidth: "300px" }}
            />
        </div>
    )
}

export default ShowImage;