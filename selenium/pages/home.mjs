import {By, until } from 'selenium-webdriver';
import { BankAccounts }  from './bankAccounts.mjs';
import { MyAccount } from './myAccount.mjs';
import { Form } from './form.mjs';
import { Transaction } from './transaction.mjs';

export class Home extends Form
{
    #buttonNextFirstAccess;
    #buttonDone;
    #myAccountSettings;
    #bankAccountSettings;
    #logoutButton;
    #newTransactionButton;
    #transactionTab;
    #driver;
    #userLogin;

    constructor(browserDriver,userLogin)
    {
        super(browserDriver);
        this.#userLogin = userLogin;
        this.#driver = browserDriver;
        this.#bankAccountSettings = By.xpath("//a[@data-test='sidenav-bankaccounts']");
        this.#myAccountSettings = By.xpath("//a[@data-test='sidenav-user-settings']");
        this.#buttonNextFirstAccess = By.xpath("//button[@data-test='user-onboarding-next']");
        this.#buttonDone = By.xpath("//button[@data-test='user-onboarding-next']");
        this.#logoutButton = By.xpath("//div[@data-test='sidenav-signout']");
        this.#transactionTab = By.xpath("//div[@data-test='nav-transaction-tabs']");
        this.#newTransactionButton = By.xpath("//a[@data-test='nav-top-new-transaction']");
    }

    async createFirstBankAccount(bankInfo)
    {
        await super.send(this.#buttonNextFirstAccess);
        await this.#driver.wait(until.elementLocated(this.#transactionTab), this.timeout);
        let myBankAccount = new BankAccounts(this.#driver,this.#bankAccountSettings);
        await myBankAccount.createBankAccount(bankInfo,true);
        await super.send(this.#buttonDone);
        return myBankAccount;
    }

    async setMyAccount(email,phone)
    {
        let myAccount = new MyAccount(this.#driver,this.#myAccountSettings);
        await super.send(this.#myAccountSettings);
        await myAccount.changeEmail("",email);
        await myAccount.changePhone("",phone);
        return myAccount;
    }

    async logout()
    {
        await super.send(this.#logoutButton);
    }

    getUserLogin()
    {
        return this.#userLogin;
    }

    async newTransaction()
    {
        await super.send(this.#newTransactionButton);
        return new Transaction(this.#driver);
    }
    
}