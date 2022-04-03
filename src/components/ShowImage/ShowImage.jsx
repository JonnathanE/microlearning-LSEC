import React from 'react';

const ShowImage = ({ name, url, styles, url_buffer }) => {
    return (
        <div>
            <img
                src={url_buffer ? url_buffer : url}
                alt={name}
                className={styles ? styles : 'img-fluid rounded-start'}
            />
        </div>
    )
}

export default ShowImage;