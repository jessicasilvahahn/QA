import {Builder, Browser} from 'selenium-webdriver';
import {Login} from '../pages/login.mjs';
import { describe, it} from "mocha";
import { strict as assert } from 'assert';

const GRIDURL = "http://localhost:4444/wd/hub/";
const URL = 'http://localhost:3000/';

async function driver()
{
  var browser = process.env.BROWSER;
  var grid = process.env.GRID;
  let browserType;
  let driver;

  switch(browser)
  {
    case  "Chrome":
      browserType = Browser.CHROME;
      break;

    case "Firefox":
      browserType = Browser.FIREFOX;
      break;

    case "Edge":
      browserType = Browser.EDGE;
  }

  if(grid == "y" || grid == "yes")
  {
    driver = await new Builder().forBrowser(browserType).usingServer(GRIDURL).build();
  }

  else
  {
    driver = await new Builder().forBrowser(browserType).build();
  }

  return driver;
}

describe("Cases", async function () {
    this.timeout(60000);
    before(async function () {
        this.driver = await driver();
        this.signUp;
        this.login = new Login(this.driver);
        this.homeSessionUser1;
        this.homeSessionUser2;
        this.transactionUser1;
        this.bankAccountUser1;
        this.bankAccountUser2;
        this.bankInfo = new Map();
        this.userInfo = new Map();
      });

    describe("Login", async function () {
        it("Create user", async function () {
          await this.driver.navigate().to(URL);
          this.userInfo.set('firstName', 'user');
          this.userInfo.set('lastName', 'Test');
          this.userInfo.set('userName', 'userTest');
          this.userInfo.set('password', 'user@Test');
          this.userInfo.set('confirmPassword', 'user@Test');
          this.signUp = await this.login.signUp();
          await this.signUp.createAccount(this.userInfo);
      });

      it("Login with user created", async function () {
        this.homeSessionUser1 = await this.login.login(this.userInfo.get('userName'),this.userInfo.get('password'));
          
      });

      describe("Accounts", async function () {
    
        it("Create first bank account after logged in", async function () {
          this.bankInfo.set('bankName', 'bankNameToUserTest');
          this.bankInfo.set('routingNumber', 123456789);
          this.bankInfo.set('accountNumber', 101223645);
          this.bankAccountUser1 = await this.homeSessionUser1.createFirstBankAccount(this.bankInfo);
        });
    
        it("The first bank account was created", async function () {
            let bankAccountName = this.bankInfo.get('bankName');
            let account = await this.bankAccountUser1.getBankAccount(bankAccountName);
            assert.notEqual(account,undefined,"Bank account was not created");
        });
    
        it("Set my user account", async function () {
          await this.homeSessionUser1.setMyAccount("userTest@gmail.com",123456);
        });
    
        it("Create 2nd bank account ", async function () {
          this.bankInfo.set('bankName', 'bankNameToUserTestDelete');
          this.bankInfo.set('routingNumber', 444456789);
          this.bankInfo.set('accountNumber', 203223645);
          await this.bankAccountUser1.createBankAccount(this.bankInfo);
        });
    
        it("The 2nd bank account was created", async function () {
          let bankAccountName = this.bankInfo.get('bankName');
          let account = await this.bankAccountUser1.getBankAccount(bankAccountName);
          assert.notEqual(account,undefined,"Bank account was not created");
      });
    
      it("Delete 2nd bank account", async function () {
        await this.bankAccountUser1.deleteBankAccount(this.bankInfo.get('bankName'));
    });
    
      it("Check if 2nd bank account was deleted", async function () {
          let bankAccountName = this.bankInfo.get('bankName');
          let account = await this.bankAccountUser1.getBankAccount(bankAccountName);
          assert.equal(account,undefined,"Bank account was not deleted");
      });
    
      it("Logout", async function () {
        await this.homeSessionUser1.logout();
    });

    describe("Transactions", async function () {
      it("Create user", async function () {
        await this.driver.navigate().to(URL);
        this.userInfo.set('firstName', 'user');
        this.userInfo.set('lastName', 'Transaction');
        this.userInfo.set('userName', 'userTransaction');
        this.userInfo.set('password', 'user@Transaction');
        this.userInfo.set('confirmPassword', 'user@Transaction');
        this.signUp = await this.login.signUp();
        await this.signUp.createAccount(this.userInfo);
    });
  
    it("Login with user created", async function () {
      this.homeSessionUser2 = await this.login.login(this.userInfo.get('userName'),this.userInfo.get('password'));
    });
  
    it("Create first bank account after logged in", async function () {
      this.bankInfo.set('bankName', 'bankNameToUserTransaction');
      this.bankInfo.set('routingNumber', 444456789);
      this.bankInfo.set('accountNumber', 222223645);
      this.bankAccountUser2 = await this.homeSessionUser2.createFirstBankAccount(this.bankInfo);
    });
  
    it("The first bank account was created", async function () {
        let bankAccountName = this.bankInfo.get('bankName');
        let account = await this.bankAccountUser2.getBankAccount(bankAccountName);
        assert.notEqual(account,undefined,"Bank account was not created");
    });
  
    it("Set my user account", async function () {
      await this.homeSessionUser2.setMyAccount("userTransaction@gmail.com",123456);
    });
  
    it("Logout", async function () {
      await this.homeSessionUser2.logout();
  });
  
  it("Login with 1st user created", async function () {
    this.homeSessionUser1 = await this.login.login("userTest","user@Test");
  });
  
  it("New transaction", async function () {
    this.transactionUser1 = await this.homeSessionUser1.newTransaction("user Transaction");
  });
  
  it("Pay", async function () {
    let amount = 100;
    let description = "pay user Transaction";
    await this.transactionUser1.payAmount("user Transaction",amount,description);
  });
  
  it("Request a pay", async function () {
    let amount = 50;
    let description = "Request a pay to user Transaction";
    await this.transactionUser1.requestPay("user Transaction",amount,description);
  });
  
  });

  });
  });

  after(async function () {
    await this.driver.close();
    });
  
  });