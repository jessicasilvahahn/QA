import { Form } from './form.mjs';
import {By, until} from 'selenium-webdriver';
import { Home } from './home.mjs';
import { Signup } from './signup.mjs';

export class Login extends Form
{
    #loginButton;
    #usernameId;
    #passwordId;
    #signUpButton;
    #signH1;
    #userH6;
    #driver;

    constructor(browserDriver)
    {
        super(browserDriver);
        this.#driver = browserDriver;
        this.#loginButton = By.xpath("//button[@data-test='signin-submit']");
        this.#usernameId = By.xpath("//input[@id='username']");
        this.#signH1 = By.xpath("//h1[@data-test='signup-title']");
        this.#userH6 = By.xpath("//h6[@data-test='sidenav-user-full-name']");
        this.#passwordId = By.id('password');
        this.#signUpButton = By.linkText("Don't have an account? Sign Up");
    }

    async signUp()
    {
        await super.send(this.#signUpButton);
        await this.#driver.wait(until.elementLocated(this.#signH1), this.timeout);
        return new Signup(this.#driver);
    }

    async login(username,password)
    {
        let userLogin = new Map();
        userLogin.set("user",username);
        userLogin.set("password",password);
        await super.enterInput(this.#usernameId,username);
        await super.enterInput(this.#passwordId,password);
        await super.send(this.#loginButton);
        await this.#driver.wait(until.elementLocated(this.#userH6), this.timeout);
        return new Home(this.#driver,userLogin);
        
    }
}