import React from 'react';
import NavigationAdmin from './NavigationAdmin';

const DashBoard = (req, res) => {
    return(
        <>
            <NavigationAdmin />
            <div>
                Admin panel 2
            </div>
        </>
    )
}

export default DashBoard;