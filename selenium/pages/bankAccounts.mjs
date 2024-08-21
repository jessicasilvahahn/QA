import {By, until} from 'selenium-webdriver';
import { Form }  from './form.mjs';

export class BankAccounts extends Form
{
    #driver;
    #buttonSave;
    #bankName;
    #routingNumber;
    #accountNumber;
    #myBankAccount;
    #createAccountButton;
    #bankAccountList;
    
    constructor(browserDriver,myBankAccount)
    {
        super(browserDriver);
        this.#driver = browserDriver;
        this.#buttonSave = By.xpath("//button[@data-test='bankaccount-submit']");
        this.#bankName = By.id("bankaccount-bankName-input");
        this.#routingNumber = By.id("bankaccount-routingNumber-input");
        this.#accountNumber = By.id("bankaccount-accountNumber-input");
        this.#myBankAccount = myBankAccount;
        this.#createAccountButton = By.xpath("//a[@data-test='bankaccount-new']");
        this.#bankAccountList = By.xpath("//li[@class='MuiListItem-root MuiListItem-gutters']");

    }

    async createBankAccount(bankInfo, isFirstAccount=false)
    {
        if(!isFirstAccount)
        {
            super.send(this.#createAccountButton);
            super.send(this.#myBankAccount);
        }
        await super.enterInput(this.#bankName,bankInfo.get("bankName"));
        await super.enterInput(this.#routingNumber,bankInfo.get("routingNumber"));
        await super.enterInput(this.#accountNumber,bankInfo.get("accountNumber"));
        await super.send(this.#buttonSave);
    }

    async getBankAccounts()
    {
        super.send(this.#myBankAccount);
        await this.#driver.wait(until.elementLocated(this.#bankAccountList),super.timeout);
        return await this.#driver.findElements(this.#bankAccountList);
    }

    async getBankAccount(name)
    {
        let accounts = await this.getBankAccounts();
        let account;
        let accountFound = undefined;
        let tagForEveryAccount = By.tagName("p");
        for(account of accounts) {
            await this.#driver.wait(until.elementLocated(tagForEveryAccount),super.timeout);
            let element = await account.findElement(tagForEveryAccount);
            if(await element.getText() == name)
            {
                accountFound = account;
                break;
            }
        }
        return accountFound;
    }

    async deleteBankAccount(name)
    {
        let account = await this.getBankAccount(name);
        let accountDataTest = await account.getAttribute('data-test');
        let deleteButton = By.xpath(`//li[@data-test="${accountDataTest}"]//button[@type="button"]`);
        await this.#driver.wait(until.elementLocated(deleteButton),super.timeout);
        let element = await account.findElement(deleteButton);
        await element.click();
    }
}