import {Builder, Browser} from 'selenium-webdriver';
import {Login} from '../pages/login.mjs';
import { describe, it} from "mocha";
import { strict as assert } from 'assert';

var URL = 'http://localhost:3000/';
let driver;
let login;
let userInfo = new Map();

describe("Login", async function () {
    this.timeout(30000);
    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        login = new Login(driver);
      });
 
    it("Create user", async function () {
        await driver.navigate().to(URL);
        userInfo.set('firstName', 'user');
        userInfo.set('lastName', 'Test');
        userInfo.set('userName', 'userTest');
        userInfo.set('password', 'user@Test');
        userInfo.set('confirmPassword', 'user@Test');
        await login.createAccount(userInfo);
    });

    it("Login with user created", async function () {
        let result = await login.login(userInfo.get('userName'),userInfo.get('password'));
        assert.equal(result,true,"Error to Log in");
    });

    after(async function () {
      console.log("Closing driver");
      await login.close();
    });
  });