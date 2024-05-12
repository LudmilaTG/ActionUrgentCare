import { expect, type Page } from "@playwright/test";
import { wait } from "../utils/baseFunctions";

export class CommonPage {
    constructor(readonly page: Page) { }

    async checkIfNewTabIsOpenedAndReturnThisPage(page: Page, url: string) {
        await page.context().waitForEvent('page');

        const openedPage = page
            .context()
            .pages()
            .filter((page: { url: () => string | string[]; }) => page.url().includes(url))[0];
        await openedPage.waitForLoadState();
        await openedPage.bringToFront();
        return openedPage;
    }

    async checkIfNewTabOpenedHasUrl(textInUrl: string, context: any, myFunction: any) {
        const pagePromise = context.waitForEvent('page', { actionTimeout: 90000, timeout: 30 * 1000 });
        await myFunction();
        await (await pagePromise).waitForLoadState();
        await expect(((await pagePromise).url()).includes(textInUrl)).toBeTruthy();
        await (await pagePromise).close();
    }

    async reloadPage() {
        await this.page.reload();
        await wait(2000)
    }
}

export default CommonPage;