import {By, until} from 'selenium-webdriver';
import { Form }  from './form.mjs';

export class MyAccount extends Form
{
    #driver;
    #myAccount;
    #email;
    #phone;
    #buttonSaveAccount;

    constructor(browserDriver,myAccount)
    {
        super(browserDriver);
        this.#driver = browserDriver;
        this.#myAccount = myAccount;
        this.#email = By.id("user-settings-email-input");
        this.#phone = By.id("user-settings-phoneNumber-input");
        this.#buttonSaveAccount = By.xpath("//button[@data-test='user-settings-submit']");
    }

    async changeEmail(email,newEmail)
    {
        let element;
        super.send(this.#myAccount);
        await this.#driver.wait(until.elementLocated(this.#email),super.timeout);
        element = await this.#driver.findElement(this.#email);
        let currentEmail = await element.getAttribute("value");
        if(currentEmail == email)
        {
            await element.sendKeys(newEmail);
            await super.send(this.#buttonSaveAccount);
        }
        
    }

    async changePhone(phone,newPhone)
    {
        let element;
        super.send(this.#myAccount);
        await this.#driver.wait(until.elementLocated(this.#phone),super.timeout);
        element = await this.#driver.findElement(this.#phone);
        let currentPhone = await element.getAttribute("value");
        if(currentPhone == phone)
        {
            await element.sendKeys(newPhone);
            await super.send(this.#buttonSaveAccount);
        } 
    }
}