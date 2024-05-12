import { Page, expect } from "@playwright/test";
import { wait } from "../utils/baseFunctions";

export class ClinicDetailsPage {
    private readonly clinicNameText = this.page.locator("xpath=//*[contains(@class,'ClinicHeader_leftSide__')]//h1");
    private readonly bookAppoinmentWidget = this.page.locator('#appointments-widget');
    private readonly allFreeSlots = this.bookAppoinmentWidget.getByText(/am$|pm$/);
    private readonly selectButton = this.bookAppoinmentWidget.getByText("Select", { exact: true });
    private readonly continueButton = this.bookAppoinmentWidget.getByText("Continue", { exact: true });
    private readonly coughButton = this.bookAppoinmentWidget.getByText("Cough", { exact: true });
    private readonly commonDateText = this.bookAppoinmentWidget.locator('xpath=//*[contains(text(),"Next")]/../../..//*[contains(@class,"MuiGrid-direction-xs-column")]/div[2]/div');
    private readonly currentDateText = this.commonDateText.nth(0);
    private readonly nextDateText = this.commonDateText.nth(1);
    private readonly chooseOtherClinicButton = this.bookAppoinmentWidget.getByText('Choose Another Clinic');

    constructor(readonly page: Page) { }

    async checkIfClinicPageOpened(clinicName: string) {
        await expect(this.clinicNameText).toContainText(clinicName);
    }

    async checkIfBookAppinmentWidgetVisible() {
        await expect(this.bookAppoinmentWidget).toBeVisible();
        await wait(1000);
    }

    async showAllSlots() {
        const count = await this.allFreeSlots.count();
        console.log("count = " + count);
        let slots = await this.allFreeSlots.allTextContents();

        for (let i = 0; i < count; i++)
            console.log(slots[i]);
    }

    async getRandomFreeSlotAndClick() {
        const count = await this.allFreeSlots.count();
        let randomSlotIndex = Math.floor(Math.random() * count);
        let timeSlotLocator = await this.allFreeSlots.nth(randomSlotIndex);
        await timeSlotLocator.click();
        await wait(500);

        let nextDateSectionLocator = await timeSlotLocator.locator('xpath=/../../following-sibling::*[1]');
        let isCurrentDate = await nextDateSectionLocator.isVisible();

        let fullSlotData = [
            await this.allFreeSlots.nth(randomSlotIndex).textContent(),
            isCurrentDate
                ? await this.currentDateText.innerText()
                : (await this.nextDateText.innerText())];

        return fullSlotData;
    }

    async clickSelectButton() {
        await this.selectButton.click();
        await wait(500);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickCoughButton() {
        await this.coughButton.click();
        await wait(500);
    }

    async clickChooseOtherClinicButton() {
        await this.chooseOtherClinicButton.click();
    }
}


export default ClinicDetailsPage;