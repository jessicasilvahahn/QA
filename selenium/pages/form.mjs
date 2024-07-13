
import { until } from 'selenium-webdriver';

export class Form
{
    #driver;

    constructor(browserDriver,timeout=1000)
    {
        this.#driver = browserDriver;
        this.thimeout = timeout;
    }

    async enterInput(input,value)
    {
        let inputElement = await this.#driver.findElement(input);
        await inputElement.sendKeys(value);
    }

    async send(submitBt)
    {
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