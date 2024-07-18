
import { until } from 'selenium-webdriver';

export class Form
{
    #driver;

    constructor(browserDriver,timeout=10000)
    {
        this.#driver = browserDriver;
        this.timeout = timeout;
    }

    async enterInput(input,value)
    {
        await this.#driver.wait(until.elementLocated(input), this.timeout);
        let inputElement = await this.#driver.findElement(input);
        await inputElement.sendKeys(value);
        
    }

    async send(submitBt)
    {
        await this.#driver.wait(until.elementLocated(submitBt), this.timeout);
        let button = await this.#driver.findElement(submitBt);
        await this.#driver.executeScript("arguments[0].click();", button);
    }

    setDriver(newDriver)
    {
        this.#driver = newDriver;
    }

    getDriver()
    {
        return this.#driver;
    }

    async close()
    {
        await this.#driver.quit();
        
    }
}