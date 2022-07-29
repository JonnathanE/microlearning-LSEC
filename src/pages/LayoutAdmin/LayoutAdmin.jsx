import Sidebar from '../../components/Sidebar/Sidebar';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';

const LayoutAdmin = ({ children }) => {
    return (
        <div className='flex w-full font-sans text-gray-900'>
            <Sidebar />
            <div className='flex-[6]'>
                <NavbarAdmin />
                {children}
            </div>
        </div>
    );
}

export default LayoutAdmin;
