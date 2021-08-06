import React from 'react';

import './Spinner.css'

const Alert = ({ isOpen, messagge }) => {
    return (
        <div className=''>
            <div className=''>
                <div className='alert alert-danger align-middle' role="alert" style={{ display: isOpen ? '' : 'none' }}>
                    {messagge}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
    );
}

export default Alert;
