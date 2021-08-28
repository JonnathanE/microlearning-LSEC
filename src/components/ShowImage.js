import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url, styles }) => {
    return (
        <div>
            <img
                src={`${API}/${url}/${item._id}`}
                alt={item.name}
                className={styles ? styles : 'img-fluid rounded-start'}
            />
        </div>
    )
}

export default ShowImage;