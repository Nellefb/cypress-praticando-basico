/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

import common_page from '../support/pages/common_page'
import cadastro_page from '../support/pages/cadastro_usuario_page'

describe('Cadastro de usuário', () => {

    const name = faker.person.firstName()
    const email = faker.internet.email()

    beforeEach('Acessar cadastro de usuário', () => {
        common_page.acessarCadastroUsuario()
    })

    it('Campo nome vazio', () => {
        cadastro_page.clicarCadastrar()
        cadastro_page.validarMensagemErro('O campo nome deve ser prenchido')
    })

    it('Campo e-mail vazio', () => {
        cadastro_page.preencheNome(name)
        cadastro_page.clicarCadastrar()
        cadastro_page.validarMensagemErro('O campo e-mail deve ser prenchido corretamente')
    })

    it('Campo e-mail inválido', () => {
        cadastro_page.preencheNome(name)
        cadastro_page.preencheEmail('email')
        cadastro_page.clicarCadastrar()
        cadastro_page.validarMensagemErro('O campo e-mail deve ser prenchido corretamente')
    })

    it('Campo senha vazio', () => {
        cadastro_page.preencheNome(name)
        cadastro_page.preencheEmail(email)
        cadastro_page.clicarCadastrar()
        cadastro_page.validarMensagemErro('O campo senha deve ter pelo menos 6 dígitos')
    })

    it('Campo senha inválido', () => {
        cadastro_page.preencheNome(name)
        cadastro_page.preencheEmail(email)
        cadastro_page.preencheSenha('12345')
        cadastro_page.clicarCadastrar()
        cadastro_page.validarMensagemErro('O campo senha deve ter pelo menos 6 dígitos')
    })

    it('Cadastro com sucesso', () => {

        cadastro_page.preencheNome(name)
        cadastro_page.preencheEmail(email)
        cadastro_page.preencheSenha('123456')
        cadastro_page.clicarCadastrar()
        cadastro_page.validarMensagemSucesso(name)
    })
})