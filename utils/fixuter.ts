import { test as base } from "@playwright/test";
import HomePage from "../pages/home-page";
import ConfirmAppointmentPage from "../pages/confirm-appointment-page";
import ClinicDetailsPage from "../pages/clinic-details-page";
import CommonPage from "../pages/common-page";

type PageFixtures = {
    homePage: HomePage;
    clinicDetailsPage: ClinicDetailsPage;
    confirmAppointmentPage: ConfirmAppointmentPage;
    commonPage: CommonPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    clinicDetailsPage: async ({ page }, use) => {
        await use(new ClinicDetailsPage(page));
    },

    confirmAppointmentPage: async ({ page }, use) => {
        await use(new ConfirmAppointmentPage(page));
    },

    commonPage: async ({ page }, use) => {
        await use(new CommonPage(page));
    },
})