
const ShowImage = ({ name, url, styles, url_buffer }) => {
    return (
        <img
            src={url_buffer ? url_buffer : url}
            alt={name}
            className={styles ? styles : 'w-32 h-32 sm:w-72 sm:h-72'}
        />
    )
}

export default ShowImage;