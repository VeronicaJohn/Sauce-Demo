const{test,expect}=require('@playwright/test');
const saucePageDetails = require('../test-data/sauce.json');
const exp = require('constants');

exports.saucePage = class SaucePage {
    constructor(page) {
        this.page = page;
        this.username = this.page.locator('#user-name');
        this.password = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
        this.backpackAddtoCartButton = this.page.locator('#add-to-cart-sauce-labs-backpack');
        this.backpackRemoveButton = this.page.locator('#remove-sauce-labs-backpack');
        this.tshirtAddtoCartButton = this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
        this.tshirtRemoveButton = this.page.locator('#remove-sauce-labs-bolt-t-shirt');
        this.cartBadgeText = this.page.locator('//span[@class="shopping_cart_badge"]');
        this.cartButton = this.page.locator('#shopping_cart_container');
        this.order1ItemName = this.page.locator('//div[@class="cart_item"][1]/div/a/div');
        this.order2Itemname = this.page.locator('//div[@class="cart_item"][2]/div/a/div');
        this.checkOutButton = this.page.locator('#checkout');
        this.firstName =this.page.locator('#first-name');
        this.lastName = this.page.locator('#last-name');
        this.postalCode = this.page.locator('#postal-code');
        this.continueButton = this.page.locator('#continue');
        this.finishButton = this.page.locator('#finish');
        this.menuButton = this.page.locator('#react-burger-menu-btn');
        this.logoutButton = this.page.locator('#logout_sidebar_link');
    }

    async navigateTo() {
        await this.page.goto('./');
        //url check
        await expect(this.page).toHaveURL('./');
        //title check
        await expect(this.page).toHaveTitle('Swag Labs');
        //visibility check
        await expect(this.username).toBeVisible();
        await expect(this.password).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        //value check
        await expect(this.loginButton).toHaveValue('Login');  
    }

    async login() {
        //login utility 
        await this.username.fill(process.env.SAUCE_USERNAME);
        await this.password.fill(process.env.SAUCE_PASSWORD); 
        //utility check
        await expect(this.username).toHaveValue(process.env.SAUCE_USERNAME);
        await expect(this.password).toHaveValue(process.env.SAUCE_PASSWORD);
        //login click
        await this.loginButton.click();
    }

    async productPage(){
        //url check
        await expect(this.page).toHaveURL(process.env.PRODUCTPAGEURL);
        //title check
        await expect(this.page).toHaveTitle(saucePageDetails.pagetitle.title);

        await expect(this.cartBadgeText).toBeHidden();
        //Add to cart
        await expect(this.backpackAddtoCartButton).toBeVisible();
        await expect(this.backpackRemoveButton).not.toBeVisible();
        await expect(this.backpackAddtoCartButton).toHaveText(saucePageDetails.addtocartText.addText);
        await this.backpackAddtoCartButton.click();
        //Remove from cart
        await expect(this.cartBadgeText).toHaveText("1");
        await expect(this.backpackAddtoCartButton).not.toBeVisible();
        await expect(this.backpackRemoveButton).toBeVisible();
        await expect(this.backpackRemoveButton).toHaveText(saucePageDetails.addtocartText.removeText);
        //Add to cart
        await expect(this.tshirtAddtoCartButton).toBeVisible();
        await expect(this.tshirtRemoveButton).not.toBeVisible();
        await expect(this.tshirtAddtoCartButton).toHaveText(saucePageDetails.addtocartText.addText);
        await this.tshirtAddtoCartButton.click();
        //Remove from cart
        await expect(this.cartBadgeText).toHaveText("2");
        await expect(this.tshirtAddtoCartButton).not.toBeVisible();
        await expect(this.tshirtRemoveButton).toBeVisible();
        await expect(this.tshirtRemoveButton).toHaveText(saucePageDetails.addtocartText.removeText);
        await this.cartButton.click();
    }

    async addTocartPage(){
        await expect(this.page).toHaveURL(process.env.ADDTOCARTPAGEURL)
        await expect(this.order1ItemName).toBeVisible();
        await expect(this.order2Itemname).toBeVisible();
        await expect(this.order1ItemName).toHaveText(saucePageDetails.orderDetails1.ItemName);
        await expect(this.order2Itemname).toHaveText(saucePageDetails.orderDetails2.ItemName);
        await expect(this.checkOutButton).toBeVisible();
        await this.checkOutButton.click();
    } 

    async checkoutInfoPage(){
        await expect(this.page).toHaveURL(process.env.INFOPAGEURL);
        await expect(this.firstName).toBeVisible();
        await expect(this.lastName).toBeVisible();
        await expect(this.postalCode).toBeVisible();
        await this.firstName.fill(saucePageDetails.Information.firstName);
        await this.lastName.fill(saucePageDetails.Information.lastName);
        await this.postalCode.fill(saucePageDetails.Information.pinCode);
        await this.continueButton.click();
    }
    async checkoutCompletePage(){
        await expect(this.page).toHaveURL(process.env.CHECKOUTPAGEURL);
        await expect(this.finishButton).toBeVisible();
        await this.finishButton.click();
    }
    async logout(){
        await expect(this.menuButton).toBeVisible();
        await this.menuButton.click();
        await expect(this.logoutButton).toBeVisible();
        await this.logoutButton.click();
    }
    async close(){
        //await this.page.pause();
        await this.page.close();
    }
}