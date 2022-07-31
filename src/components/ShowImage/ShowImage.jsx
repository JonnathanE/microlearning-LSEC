import { useState } from 'react';
import LoaderImage from '../../components/LoaderImage/LoaderImage';

const ShowImage = ({ name, url, styles, url_buffer, alternative = 'Cargando recurso...' }, styleLazy = 'not') => {

    const [loaded, setLoaded] = useState(false);

    const onLoad = () => {
        setLoaded(true);
    }

    return (
        <>
            <img
                src={url_buffer ? url_buffer : url}
                alt={name}
                className={styles ? styles : 'w-32 h-32 sm:w-72 sm:h-72'}
                style={{ display: loaded ? 'block' : 'none' }}
                onLoad={onLoad}
            />
            {!loaded &&
                <div className={styleLazy === 'not' ? 'w-32 h-32 sm:w-72 sm:h-72 bg-gray-300 flex flex-col items-center justify-center' : styleLazy}>
                    <div>
                        <span className='text-white font-bold mb-6 text-center'>{alternative}</span>
                        <LoaderImage />
                    </div>
                </div>}
        </>
    )
}

export default ShowImage;