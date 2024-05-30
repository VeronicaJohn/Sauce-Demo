const{test,expect}=require('@playwright/test');
const{saucePage} = require('../pages/sause');

test('Sauce Demo Page',async({page})=>{
    const sauce = new saucePage(page);
    await test.step('Navigation To Sauce Page',async()=>{
        await sauce.navigateTo();
    })
    await test.step('Logging In',async()=>{

        await sauce.login();
    })
    await test.step('Navigating to Product Page',async()=>{

        await sauce.productPage();
    })
    await page.pause();
    await test.step('Adding to Cart',async()=>{

        await sauce.addTocartPage();
    })
    
    await test.step('Checkout Information Page',async()=>{

        await sauce.checkoutInfoPage();
    })
    await test.step('Checkout Finish Page',async()=>{

        await sauce.checkoutCompletePage();
    })
    await test.step('Logging out',async()=>{

        await sauce.logout();
    })
    await test.step('Closing Page',async()=>{

        await sauce.close();
    })
});