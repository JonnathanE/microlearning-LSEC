import tw, { styled } from 'twin.macro';
import { IconContext } from "react-icons";
import { MdInfoOutline, MdErrorOutline } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineWarning } from "react-icons/ai";

const Content = styled.div`
    ${tw`
            flex p-4 mb-4 text-sm
        `
    }
    ${({ severity }) => severity === 'info' ? tw`text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800` : tw``}
    ${({ severity }) => severity === 'error' ? tw`text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800` : tw``}
    ${({ severity }) => severity === 'success' ? tw`text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800` : tw``}
    ${({ severity }) => severity === 'warning' ? tw`text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800` : tw``}
    ${({ severity }) => severity === 'dark' ? tw`text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300` : tw``}
`;

const Alert = ({ severity = 'info', children }) => {
    return (
        <Content severity={severity}>
            <IconContext.Provider value={{ className: "inline flex-shrink-0 mr-3 w-5 h-5" }}>
                {severity === 'info' && <MdInfoOutline />}
                {severity === 'error' && <MdErrorOutline />}
                {severity === 'success' && <IoMdCheckmarkCircleOutline />}
                {severity === 'warning' && <AiOutlineWarning />}
                {severity === 'dark' && <MdInfoOutline />}
                {children}
            </IconContext.Provider>
        </Content>
    );
}

export default Alert;
