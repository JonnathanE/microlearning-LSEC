const ShowImage = ({ name, url, styles, urlBuffer }) => {
	return (
		<div>
			<img
				src={urlBuffer || url}
				alt={name}
				className={styles || 'img-fluid rounded-start'}
			/>
		</div>
	);
};

export default ShowImage;
