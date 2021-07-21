import React from 'react';
import { API } from '../config';

import './ShowImage.css';

const ShowImage = ({ item, url }) => {
    return (
        <div className="product-img">
            <img
                src={`${API}/${url}/${item._id}`}
                alt={item.name}
                className="img-fluid rounded-start"
            />
        </div>
    )
}

export default ShowImage;