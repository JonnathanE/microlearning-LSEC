
const Modal = ({ children }) => {
    return (
        <div className="className='z-30 fixed pt-28 left-0 top-0 w-full h-full overflow-auto bg-gray-700/30 '">
            {children}
        </div>
    )
}

export default Modal;