import tw, { styled } from 'twin.macro';
import useDarkMode from '../../hook/useDarkMode';

import Sun from '../../img/sun.png';
import Moon from '../../img/moon.png';

const ToggleWrapp = tw.div`
    w-[50px]
    h-[25px]
    rounded-[20px]
    border
    border-gray-500
    bg-white
    relative
    flex
    items-center
    justify-around
`;

const ToggleImg = tw.img`
    w-[15px]
    h-[15px]
`;

const ToggleButton = styled.div`
    ${tw`
        w-[25px]
        h-[25px]
        rounded-full
        bg-bookmark-grey
        absolute
        cursor-pointer
    `}
    ${props => (props.isLight ? tw`left-0` : tw`right-0`)}
`;

const ToggleDarkMode = () => {

    const [colorTheme, setTheme] = useDarkMode();

    return (
        <ToggleWrapp onClick={() => setTheme(colorTheme)}>
            <ToggleImg src={Sun} />
            <ToggleImg src={Moon} />
            <ToggleButton isLight={colorTheme === 'light'}></ToggleButton>
        </ToggleWrapp>
    )
}

export default ToggleDarkMode;