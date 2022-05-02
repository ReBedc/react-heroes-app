import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas con Navbar', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Pedro'
        }
    }
    
    const wrapper = mount(
        <AuthContext.Provider value= {contextValue}>
            <MemoryRouter initialEntries={ ['/'] }>
                <Navbar />
            </MemoryRouter>
        </AuthContext.Provider>

    );

    test('debe de mostrarse correctamente ', () => {

        // Pedro
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Pedro');

    });

    test('debe de llamar el logout, el navigate y dispatch con los argumentos ', () => {

        wrapper.find('button').prop('onClick')();
        
        expect(contextValue.dispatch).toHaveBeenCalledWith({'type': types.logout});
        expect( mockNavigate ).toHaveBeenCalledWith('/login', {replace: true});

    });
});