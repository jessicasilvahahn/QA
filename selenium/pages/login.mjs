import { Signup } from './signup.mjs';
import {By} from 'selenium-webdriver';

export class Login extends Signup
{
    #loginBt;
    #usernameId;
    #passwordId;
    #createAccountLink;

    constructor(browserDriver)
    {
        super(browserDriver);
        this.#loginBt = super.getSignUpBt();
        this.#usernameId = By.xpath("//input[@id='username']");
        this.#passwordId = super.getPassword();
        this.#createAccountLink = By.linkText("Don't have an account? Sign Up");
    }

    async #requestPageToCreateAccount()
    {
        await super.send(this.#createAccountLink);
    }

    async login(username,password)
    {
        await super.enterInput(this.#usernameId,username);
        await super.enterInput(this.#passwordId,password);
        await super.send(this.#loginBt);
    }

    async createAccount(accountInfo)
    {
        await this.#requestPageToCreateAccount();
        await super.createAccount(accountInfo);
    }
}