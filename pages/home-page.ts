import { Page } from "@playwright/test";

export class HomePage {
    private readonly dropDownItemNavMenu = this.page.locator('xpath=//*[contains(@class,"nav-item")]');
    private readonly inClinicButtonNavMenu = this.dropDownItemNavMenu.getByRole("button", { 'name': "In-Clinic Care" });
    private readonly blossomClinicButtonNavMenu = this.page.locator("xpath=//*[contains(@class,'dropdown-item')]").and(this.page.getByText('San Jose - Blossom Hill Rd.'));

    constructor(readonly page: Page) { }

    async open() {
        await this.page.goto('/');
    }

    async hoverInClinicButtonNavMenu() {
        await this.inClinicButtonNavMenu.hover();
    }

    async clickBlossomClinicButton() {
        await this.blossomClinicButtonNavMenu.click();
    }
}

export default HomePage;