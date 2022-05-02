import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { DashboardRoutes } from '../../../components/routers/DashboardRoutes';



describe('Pruebas con DashboardRoutes', () => {

    const contextValue = {
        user: {
            logged: true,
            name: 'Juanito'
        }
    }

    test('debe de mostrarse correctamente - Marvel', () => {

        const wrapper = mount(
            <AuthContext.Provider value= {contextValue}>
                <MemoryRouter initialEntries={ ['/'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Juanito');
        expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen');

    });

    test('debe de mostrarse correctamente - DC', () => {

        const wrapper = mount(
            <AuthContext.Provider value= {contextValue}>
                <MemoryRouter initialEntries={ ['/dc'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('DCScreen');
    });

})