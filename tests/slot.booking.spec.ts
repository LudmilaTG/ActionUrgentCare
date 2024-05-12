import { test } from '../utils/fixuter';
import { wait } from '../utils/baseFunctions';
import ConfirmAppoitmentPage from '../pages/confirm-appointment-page';
import ClinicDetailsPage from '../pages/clinic-details-page';

const clinicName = "San Jose - Blossom Hill Rd.";

test.beforeEach(async ({ homePage, clinicDetailsPage }) => {
    await homePage.open();
    await homePage.hoverInClinicButtonNavMenu();
    await homePage.clickBlossomClinicButton();
    await clinicDetailsPage.checkIfClinicPageOpened(clinicName);
})

test('check the booking with random time slot', async ({ page, homePage, clinicDetailsPage, commonPage }) => {
    await clinicDetailsPage.checkIfBookAppinmentWidgetVisible();

    const slotData = await clinicDetailsPage.getRandomFreeSlotAndClick();
    await clinicDetailsPage.clickSelectButton();
    await clinicDetailsPage.clickCoughButton();
    await clinicDetailsPage.clickContinueButton();

    const openedPage = await commonPage.checkIfNewTabIsOpenedAndReturnThisPage(page, 'confirm-appointment');
    const confirmAppointmentPage = new ConfirmAppoitmentPage(openedPage);
    await confirmAppointmentPage.checkIfCreateNewAccountButtonVisible();
    await confirmAppointmentPage.checkIfTimeSlotIs(slotData[0]);
    await confirmAppointmentPage.checkIfDateSlotIs(slotData[1]);
    await confirmAppointmentPage.checkIfClinicNameIs(clinicName);
});

test('check Choose Other Clinic button ', async ({ page, context, commonPage, clinicDetailsPage }) => {
    await commonPage.checkIfNewTabOpenedHasUrl('/in-clinic-care', context, () => {
        clinicDetailsPage.clickChooseOtherClinicButton();
    });
})