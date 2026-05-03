/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

import common_page from '../support/pages/common_page';
import login_page from '../support/pages/login_page';


describe('Login', () => {
    
    beforeEach('Acessar Login de Usuário', () =>{
            common_page.acessarLoginUsuario()
    })

    it('E-mail vazio', () => {
        login_page.clicarLogin();
        login_page.validarMensagemErro('E-mail inválido.')
    })

    it('E-mail inválido', () => {
        login_page.preencheEmail('nala')
        login_page.clicarLogin();
        login_page.validarMensagemErro('E-mail inválido.')
    })

    it('Senha Vazia', () => {
        login_page.preencheEmail(faker.internet.email())
        login_page.clicarLogin();
        login_page.validarMensagemErro('Senha inválida.')
    })

    it('Senha inválida', () => {
        login_page.preencheEmail(faker.internet.email())
        login_page.preencheSenha('123')
        login_page.clicarLogin();
        login_page.validarMensagemErro('Senha inválida.')
    })

    it('Login com sucesso e marcando checkbox', async () => {

        const email = await faker.internet.email()

        login_page.preencheEmail(email)
        login_page.preencheSenha('123456')
        login_page.checkLembrar();
        login_page.clicarLogin();
        login_page.validarMensagemSucesso(email);
    })
})