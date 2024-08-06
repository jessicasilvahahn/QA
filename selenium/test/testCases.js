import {Builder, Browser} from 'selenium-webdriver';
import {Login} from '../pages/login.mjs';
import {Home} from '../pages/home.mjs';
import { describe, it} from "mocha";
import { strict as assert } from 'assert';

describe("Cases", async function () {
    this.timeout(60000);
    before(async function () {
        this.URL = 'http://localhost:3000/';
        this.driver = await new Builder().forBrowser(Browser.CHROME).build();
        this.login = new Login(this.driver);
        this.home = new Home(this.driver);
        this.transaction = this.home.getTransaction();
        this.bankAccount = this.home.getBankAccount();
        this.bankInfo = new Map();
        this.userInfo = new Map();
      });

    describe("Login", async function () {
        it("Create user", async function () {
          await this.driver.navigate().to(this.URL);
          this.userInfo.set('firstName', 'user');
          this.userInfo.set('lastName', 'Test');
          this.userInfo.set('userName', 'userTest');
          this.userInfo.set('password', 'user@Test');
          this.userInfo.set('confirmPassword', 'user@Test');
          await this.login.createAccount(this.userInfo);
      });

      it("Login with user created", async function () {
          let result = await this.login.login(this.userInfo.get('userName'),this.userInfo.get('password'));
          assert.equal(result,true,"Error to Log in");
      });
    });
 
  describe("Accounts", async function () {
    
    it("Create first bank account after logged in", async function () {
      this.bankInfo.set('bankName', 'bankNameToUserTest');
      this.bankInfo.set('routingNumber', 123456789);
      this.bankInfo.set('accountNumber', 101223645);
      await this.home.createFirstBankAccount(this.bankInfo);
    });

    it("The first bank account was created", async function () {
        let bankAccountName = this.bankInfo.get('bankName');
        let account = await this.bankAccount.getBankAccount(bankAccountName);
        assert.notEqual(account,undefined,"Bank account was not created");
    });

    it("Change email and phone for the first time", async function () {
      await this.home.changeMyAccountFirstTime("userTest@gmail.com",123456);
    });

    it("Create 2nd bank account ", async function () {
      this.bankInfo.set('bankName', 'bankNameToUserTestDelete');
      this.bankInfo.set('routingNumber', 444456789);
      this.bankInfo.set('accountNumber', 203223645);
      await this.bankAccount.createBankAccount(this.bankInfo);
    });

    it("The 2nd bank account was created", async function () {
      let bankAccountName = this.bankInfo.get('bankName');
      let account = await this.bankAccount.getBankAccount(bankAccountName);
      assert.notEqual(account,undefined,"Bank account was not created");
  });

  it("Delete 2nd bank account", async function () {
    await this.bankAccount.deleteBankAccount(this.bankInfo.get('bankName'));
});

  it("Check if 2nd bank account was deleted", async function () {
      let bankAccountName = this.bankInfo.get('bankName');
      let account = await this.bankAccount.getBankAccount(bankAccountName);
      assert.equal(account,undefined,"Bank account was not deleted");
  });

  it("Logout", async function () {
    await this.home.logout();
});

  });

  describe("Transactions", async function () {
    it("Create user", async function () {
      await this.driver.navigate().to(this.URL);
      this.userInfo.set('firstName', 'user');
      this.userInfo.set('lastName', 'Transaction');
      this.userInfo.set('userName', 'userTransaction');
      this.userInfo.set('password', 'user@Transaction');
      this.userInfo.set('confirmPassword', 'user@Transaction');
      await this.login.createAccount(this.userInfo);
  });

  it("Login with user created", async function () {
      let result = await this.login.login(this.userInfo.get('userName'),this.userInfo.get('password'));
      assert.equal(result,true,"Error to Log in");
  });

  it("Create first bank account after logged in", async function () {
    this.bankInfo.set('bankName', 'bankNameToUserTransaction');
    this.bankInfo.set('routingNumber', 444456789);
    this.bankInfo.set('accountNumber', 222223645);
    await this.home.createFirstBankAccount(this.bankInfo);
  });

  it("The first bank account was created", async function () {
      let bankAccountName = this.bankInfo.get('bankName');
      let account = await this.bankAccount.getBankAccount(bankAccountName);
      assert.notEqual(account,undefined,"Bank account was not created");
  });

  it("Change email and phone for the first time", async function () {
    await this.home.changeMyAccountFirstTime("userTransaction@gmail.com",123456);
  });

  it("Logout", async function () {
    await this.home.logout();
});

it("Login with 1st user created", async function () {
  let result = await this.login.login("userTest","user@Test");
  assert.equal(result,true,"Error to Log in");
});

it("New transaction", async function () {
  await this.home.newTransaction("user Transaction");
});

it("Pay", async function () {
  let amount = 100;
  let description = "pay user Transaction";
  await this.transaction.payAmount("user Transaction",amount,description);
});

it("Request a pay", async function () {
  let amount = 50;
  let description = "Request a pay to user Transaction";
  await this.transaction.requestPay("user Transaction",amount,description);
});

});

  after(async function () {
    await this.driver.close();
    });
  
  });