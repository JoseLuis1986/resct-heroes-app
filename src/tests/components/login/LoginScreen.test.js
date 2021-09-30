import React from 'react';
import { mount } from "enzyme"
import { AuthContext } from "../../../auth/AuthContext"
import { LoginScreen } from "../../../components/login/LoginScreen"
import { types } from "../../../types/types";



describe('Pruebas en <LoginScreen />', () => {

    const history = {
        replace: jest.fn()
    };

    const contextValue = ({
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    })

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ history } />  
        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente', () => {
        //snapshot
        expect( wrapper ).toMatchSnapshot();
    })


    test('debe realizar el dispatch y la navegacion ', () => {

       const handleClick = wrapper.find('form').prop('onSubmit');

       handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Jose Luis'
            }
        });

        expect( history.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath','/dc');

        handleClick();
        
        expect( history.replace ).toHaveBeenCalledWith('/dc');
    })
    
    
})
