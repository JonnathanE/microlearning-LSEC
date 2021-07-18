import React from 'react';
import { Spinner } from 'reactstrap';

import './Loading.css'

const Loading = () => {
    return (
        <div className='divPadre'>
            <div className='divHijo'>
                <Spinner color='primary' className='spinnerReacstrap'/>
            </div>
        </div>
    );
}

export default Loading;
