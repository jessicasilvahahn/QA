import { Signup } from './signup.mjs';
import {By, until} from 'selenium-webdriver';

export class Login extends Signup
{
    #loginBt;
    #usernameId;
    #passwordId;
    #createAccountLink;
    #userNameFromHome;
    #driver;

    constructor(browserDriver)
    {
        super(browserDriver);
        this.#loginBt = super.getSignUpBt();
        this.#usernameId = By.xpath("//input[@id='username']");
        this.#passwordId = super.getPassword();
        this.#createAccountLink = By.linkText("Don't have an account? Sign Up");
        this.#userNameFromHome = By.xpath("//h6[@data-test='sidenav-username']");
        this.#driver = super.getDriver();
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
        await this.#driver.wait(until.elementLocated(this.#userNameFromHome), this.thimeout);
        let usernameHome = await this.#driver.findElement(this.#userNameFromHome);
        let usernameHomeText = await usernameHome.getText();
        return usernameHomeText.includes(username);
    }

    async createAccount(accountInfo)
    {
        await this.#requestPageToCreateAccount();
        await super.createAccount(accountInfo);
    }
}