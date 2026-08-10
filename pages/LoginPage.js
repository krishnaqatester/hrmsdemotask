export class LoginPage {

    constructor(page) {
        this.page = page;

        this.email = page.locator('input[type="email"]');
        this.password = page.locator('input[type="password"]');
        this.loginButton = page.getByRole('button', { name: /log in/i });
    }

    async login(email, password) {

        await this.page.goto('https://hrmsdemo.tdesk.io/login');

        await this.email.fill(email);
        await this.password.fill(password);

        await this.loginButton.click();

        await this.page.waitForLoadState('networkidle');
    }

}