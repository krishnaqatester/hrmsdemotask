export class DashboardPage {

    constructor(page) {

        this.page = page;

        this.hrCard = page.locator('.widget-user-header.bg-info');
        
    }
     
      hrProcessLink(url) {
        return this.page.locator(`a[href="${url}"]`);
    }

    async openHRProcess(url) {

        await this.hrCard.click();

       // await this.hrProcess.click();
       await this.hrProcessLink(url).click();

        await this.page.waitForLoadState('networkidle');

    }

}