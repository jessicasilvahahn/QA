import {By} from 'selenium-webdriver';
import { BankAccounts }  from './bankAccounts.mjs';
import { MyAccount } from './myAccount.mjs';
import { Form } from './form.mjs';

export class Home extends Form
{
    #buttonNextFirstAccess;
    #buttonDone;
    #myAccount;
    #myBankAccount;
    #myAccountSettings;
    #bankAccountSettings;

    constructor(browserDriver)
    {
        super(browserDriver);
        this.#bankAccountSettings = By.xpath("//a[@data-test='sidenav-bankaccounts']");
        this.#myAccountSettings = By.xpath("//a[@data-test='sidenav-user-settings']");
        this.#myBankAccount = new BankAccounts(browserDriver,this.#bankAccountSettings);
        this.#myAccount = new MyAccount(browserDriver,this.#myAccountSettings);
        this.#buttonNextFirstAccess = By.xpath("//button[@data-test='user-onboarding-next']");
        this.#buttonDone = By.xpath("//button[@data-test='user-onboarding-next']");
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

    getBankAccount()
    {
        return this.#myBankAccount;
    }

    getMyAccount()
    {
        return this.#myAccount;
    }
    
}