import tw from 'twin.macro';
import ToggleDarkMode from '../ToggleDarkMode/ToggleDarkMode';
import UserDropdown from '../UserDropdown/UserDropsown';

const Navbar = tw.div`
h-[50px] border-b-[0.5px] border-gray-200 flex items-center text-sm text-gray-500 dark:bg-gray-800
`;

const Wrapper = tw.div`
w-full p-5 flex items-center justify-end
`;

const Items = tw.div`
flex items-center
`;

const Item = tw.div`
flex items-center mr-5 relative
`;

const NavbarAdmin = () => {
    return (
        <Navbar>
            <Wrapper>
                <Items>
                    <Item>
                        <ToggleDarkMode />
                    </Item>
                    <Item>
                        <UserDropdown />
                    </Item>
                </Items>
            </Wrapper>
        </Navbar>
    );
}

export default NavbarAdmin;
