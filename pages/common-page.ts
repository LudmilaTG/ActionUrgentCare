import { type Page, expect } from "@playwright/test";
import { wait } from "../utils/baseFunctions";

export class CommonPage {

    constructor(readonly page: Page) { }

    async checkIfNewTabIsOpenedAndReturnThisPage(page: Page) {
        await page.context().waitForEvent('page');

        const openedPage = page
            .context()
            .pages()
            .filter((page: { url: () => string | string[]; }) => page.url().includes('confirm-appointment'))[0];
        await openedPage.waitForLoadState();
        await openedPage.bringToFront();
        return openedPage;
    }

    async reloadPage() {
        await this.page.reload();
        await wait(2000)
    }

}

export default CommonPage;