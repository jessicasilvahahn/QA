import {By} from 'selenium-webdriver';
import { Form }  from './form.mjs';

export class Signup extends Form
{
    #firstName;
    #lastName;
    #userName;
    #password;
    #confirmPassword;
    #signUpButton;

    constructor(browserDriver)
    {
        super(browserDriver);
        this.#firstName = By.id('firstName');
        this.#lastName = By.id('lastName');
        this.#userName = By.id('username');
        this.#password = By.id('password');
        this.#confirmPassword = By.id('confirmPassword');
        this.#signUpButton = By.tagName('button');
    }

    async createAccount(accountInfo)
    {
        let firstName = accountInfo.get('firstName');
        let lastName = accountInfo.get('lastName');
        let userName = accountInfo.get('userName');
        let password = accountInfo.get('password');
        let confirmPassword = accountInfo.get('confirmPassword');
        await super.enterInput(this.#firstName,firstName);
        await super.enterInput(this.#lastName,lastName);
        await super.enterInput(this.#userName,userName);
        await super.enterInput(this.#password,password);
        await super.enterInput(this.#confirmPassword,confirmPassword);
        await super.send(this.#signUpButton);
    }
}