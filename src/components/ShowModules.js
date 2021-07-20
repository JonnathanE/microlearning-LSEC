import React from 'react';
import NavigationAdmin from '../layout/NavigationAdmin';

const ShowModules = () => {

    return (
        <>
            <NavigationAdmin />
            <div className='container'>

                <table className='table table-striped table-hover caption-top table-responsive'>
                    <caption className='text-center fw-bold fs-2 text-wrap'>Lista de Modulos</caption>
                    <thead>
                        <tr>
                            <th># Modulo</th>
                            <th>Nombre</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Modulo 1</td>
                            <td>Buton</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShowModules;