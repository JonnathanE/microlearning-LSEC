import React from 'react';
import NavigationAdmin from './NavigationAdmin';

const DashBoard = (req, res) => {
    return(
        <>
            <NavigationAdmin />
            <div>
                Admin panel
            </div>
        </>
    )
}

export default DashBoard;