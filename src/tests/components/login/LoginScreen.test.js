import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas con LoginScreen', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value= {contextValue}>
            <MemoryRouter initialEntries={ ['/login'] }>
                <LoginScreen />
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('debe de mostrarse correctamente ', () => {

        const wrapper = mount(
            <AuthContext.Provider value= {contextValue}>
                <MemoryRouter initialEntries={ ['/login'] }>
                    <LoginScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
        //expect(wrapper.find('.text-info').text().trim()).toBe('Juanito');
        //expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen');

    });

    test('debe de realizar el dispatch y la navegacion', () => {

        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();
        
        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {name: 'Fernando'}
        });

        expect( mockNavigate ).toHaveBeenCalledWith('/marvel', {replace: true});

        localStorage.setItem('lastPath','/dc');
        handleClick();

        expect( mockNavigate ).toHaveBeenCalledWith('/dc', {replace: true});

        expect(wrapper).toMatchSnapshot();


    });

});