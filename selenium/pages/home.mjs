import {By} from 'selenium-webdriver';
import { BankAccounts }  from './bankAccounts.mjs';
import { MyAccount } from './myAccount.mjs';
import { Form } from './form.mjs';
import { Transaction } from './transaction.mjs';

export class Home extends Form
{
    #buttonNextFirstAccess;
    #buttonDone;
    #myAccount;
    #myBankAccount;
    #myAccountSettings;
    #bankAccountSettings;
    #logoutButton;
    #newTransactionButton;
    #transactionPage;

    constructor(browserDriver)
    {
        super(browserDriver);
        this.#bankAccountSettings = By.xpath("//a[@data-test='sidenav-bankaccounts']");
        this.#myAccountSettings = By.xpath("//a[@data-test='sidenav-user-settings']");
        this.#myBankAccount = new BankAccounts(browserDriver,this.#bankAccountSettings);
        this.#myAccount = new MyAccount(browserDriver,this.#myAccountSettings);
        this.#transactionPage = new Transaction(browserDriver);
        this.#buttonNextFirstAccess = By.xpath("//button[@data-test='user-onboarding-next']");
        this.#buttonDone = By.xpath("//button[@data-test='user-onboarding-next']");
        this.#logoutButton = By.xpath("//div[@data-test='sidenav-signout']");
        this.#newTransactionButton = By.xpath("//a[@data-test='nav-top-new-transaction']");
    }

    async createFirstBankAccount(bankInfo)
    {
        await super.send(this.#buttonNextFirstAccess);
        await this.#myBankAccount.createBankAccount(bankInfo,true);
        await super.send(this.#buttonDone);
    }

    async changeMyAccountFirstTime(email,phone)
    {
        await super.send(this.#myAccountSettings);
        await this.#myAccount.changeEmail("",email);
        await this.#myAccount.changePhone("",phone);
    }

    async logout()
    {
        await super.send(this.#logoutButton);
    }

    async newTransaction(user)
    {
        await super.send(this.#newTransactionButton);
        await this.#transactionPage.selectContact(user);
    }

    getBankAccount()
    {
        return this.#myBankAccount;
    }

    getMyAccount()
    {
        return this.#myAccount;
    }

    getTransaction()
    {
        return this.#transactionPage;
    }
    
}