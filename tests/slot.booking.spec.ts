import { test } from '../utils/fixuter';
import { wait } from '../utils/baseFunctions';
import ConfirmAppoitmentPage from '../pages/confirm-appointment-page';

const clinicName = "San Jose - Blossom Hill Rd.";

test('check slot booking with random time', async ({ page, homePage, clinicDetailsPage, commonPage }) => {
    await homePage.open();
    await homePage.hoverInClinicButtonNavMenu();
    await homePage.clickBlossomClinicButton();
    await clinicDetailsPage.checkIfClinicPageOpened(clinicName);
    await clinicDetailsPage.checkIfBookAppinmentWidgetVisible();

    const slotData = await clinicDetailsPage.getRandomFreeSlotAndClick();
    await clinicDetailsPage.clickSelectButton();
    await clinicDetailsPage.clickCoughButton();
    await clinicDetailsPage.clickContinueButton();

    const openedPage = await commonPage.checkIfNewTabIsOpenedAndReturnThisPage(page);
    const confirmAppointmentPage = new ConfirmAppoitmentPage(openedPage);
    await confirmAppointmentPage.checkIfCreateNewAccountButtonVisible();
    await confirmAppointmentPage.checkIfTimeSlotIs(slotData[0]);
    await confirmAppointmentPage.checkIfDateSlotIs(slotData[1]);
    await confirmAppointmentPage.checkIfClinicNameIs(clinicName);
});