import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas con HeroScreen', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }



    test('no debe de mostrarse el HeroScreen si no hay un heroe en la URL ', () => {

        const wrapper = mount(
                <MemoryRouter initialEntries={ ['/hero'] }>
                    <Routes>
                        <Route path="/hero" element={<HeroScreen />} />
                        <Route path="/" element={ <h1>No Hero Page</h1>} />
                    </Routes>
                </MemoryRouter>
        );
        
        console.log(wrapper.html());
        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page');

    });

    test(' debe de mostrarse un heroe si el parametro existe y se encuentra ', () => {

        const wrapper = mount(
                <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                    <Routes>
                        <Route path="/hero/:heroId" element={<HeroScreen />} />
                        <Route path="/" element={ <h1>No Hero Page</h1>} />

                    </Routes>
                </MemoryRouter>
        );
        
        console.log(wrapper.html());
        // expect(wrapper.find('.row').exists()).toBe(true); TODO
    });

    test(' debe de regresar a la pantalla anterior ', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        );
        
        
       // wrapper.find('button').simulate('Click');
        //expect( mockNavigate).toHaveBeenCalledWith(-1);
    });


    test(' debe de mostrar NO Hero Page si no tenemos un heroe ', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spidersfsdfsdfd'] }>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                    <Route path="/" element={ <h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        
        
        expect( wrapper.text()).toBe('No Hero Page');
    });

});