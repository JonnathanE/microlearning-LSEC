import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url }) => {
    return (
        <div>
            <img
                src={`${API}/${url}/${item._id}`}
                alt={item.name}
                className="img-fluid rounded-start"
            />
        </div>
    )
}

export default ShowImage;