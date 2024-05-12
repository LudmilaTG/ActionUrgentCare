import { Page, expect } from "@playwright/test";

export class ConfirmAppoitmentPage {

    private readonly frameLocator = this.page.frameLocator('xpath=//*[@width="100%"]');
    private readonly createNewAccountButton = this.frameLocator.getByText('Create new account', { exact: true });
    private readonly timeSlotText = this.frameLocator.getByText('Time').locator('xpath=//following-sibling::*[1]');
    private readonly daySlotText = this.frameLocator.getByText('Date').locator('xpath=//following-sibling::*[1]').and(this.frameLocator.locator('xpath=//*[not(contains(text(), "If you already have an account"))]'));
    private readonly locationText = this.frameLocator.getByText('Location').locator('xpath=//following-sibling::*[1]');

    constructor(readonly page: Page) { }

    async checkIfCreateNewAccountButtonVisible() {
        await expect(this.createNewAccountButton).toBeVisible();
    }

    async checkIfTimeSlotIs(timeSlot: string | null) {
        await expect(await this.timeSlotText.textContent()).toBe(timeSlot);
    }

    async checkIfClinicNameIs(name: string | null) {
        await expect(await this.locationText.textContent()).toContain(name);
    }

    async checkIfDateSlotIs(day: string | null) {
        const dateText = (await this.daySlotText.textContent())?.replace('.', '').replace('.', '');
        await expect(dateText).toBe(day);
    }

}

export default ConfirmAppoitmentPage;