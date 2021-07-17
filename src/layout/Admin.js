import React from 'react';
import NavigationAdmin from './NavigationAdmin';

const Admin = (req, res) => {
    return(
        <>
            <NavigationAdmin />
            <div>
                Admin panel
            </div>
        </>
    )
}

export default Admin;