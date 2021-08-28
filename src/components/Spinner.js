import React from 'react';
import { Spinner } from 'reactstrap';

import './Spinner.css'

const Loading = () => {
    return (
        <div className='divPadre'>
            <div className='divHijo'>
                <Spinner color='primary' className='spinnerReacstrap' children='' />
            </div>
        </div>
    );
}

export default Loading;
