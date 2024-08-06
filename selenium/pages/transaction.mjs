import {By, until} from 'selenium-webdriver';
import { Form } from './form.mjs';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export class Transaction extends Form
{
    #inputSelectContact;
    #driver;

    constructor(browserDriver)
    {
        super(browserDriver);
        this.#driver = browserDriver;
        this.#inputSelectContact = By.id("user-list-search-input");
        this.timeout = 2000;
    }

    async selectContact(user)
    {
        let selectedUser = By.xpath("//ul[@data-test='users-list']//span");
        super.enterInput(this.#inputSelectContact,user);
        await sleep(this.timeout);
        await this.#driver.wait(until.elementLocated(selectedUser), super.timeout);
        let username = await this.#driver.findElement(selectedUser);
        let usernameText = await username.getText();
        if(usernameText == user){
            await username.click();
        }
    }

    async #pay(user,amount,description)
    {
        let tagUser = By.tagName("h2");
        let inputAmount = By.id("amount");
        let inputDescription = By.id("transaction-create-description-input");
        await this.#driver.wait(until.elementLocated(tagUser), super.timeout);
        let username = await this.#driver.findElement(tagUser);
        let usernameText = await username.getText();
        if(usernameText == user){
            await super.enterInput(inputAmount,amount);
            await super.enterInput(inputDescription,description);
        }

    }

    async payAmount(user,amount,description)
    {
        let payButton = By.xpath("//button[@data-test='transaction-create-submit-payment']");
        let createAnotherTransactionButton = By.xpath("//button[@data-test='new-transaction-create-another-transaction']");
        await this.#pay(user,amount,description);
        await super.send(payButton);
        await super.send(createAnotherTransactionButton);

    }

    async requestPay(user,amount,description)
    {
        let requestButton = By.xpath("//button[@data-test='transaction-create-submit-request']");
        this.selectContact(user);
        await this.#pay(user,amount,description);
        await super.send(requestButton);
    }
}