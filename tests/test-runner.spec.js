import {test, expect} from '@playwright/test';
import fs from 'fs';
import {config} from "dotenv";

config();

import RegistrationPage from "../page/RegistrationPage.js";
import GmailService from '../service/gmail-service';

import UserData from "../utils/user-data.json" assert {type: "json"};

// test.describe('01', () => {
//     test('Register a user', async ({ page, request }) => {
//         // Register a user
//         await page.goto('/register');
//         const user = await new RegistrationPage(page).registerUser(process.env.email_prefix);
//
//         // assert the toast message
//         await expect(page.getByText(`User ${user.firstName} ${user.lastName} registered`)).toBeVisible();
//
//         // assert the congratulation mail is sent
//         await page.waitForTimeout(15000);
//         const latestGmail = await GmailService.gmail(request);
//         await expect(latestGmail.toString()).toEqual(`Dear ${user.firstName}, Welcome to our platform! We&#39;re excited to have you onboard. Best regards, Road to Career`);
//
//         UserData.push(user);
//         fs.writeFileSync("./utils/user-data.json", JSON.stringify(UserData, null, 2));
//     });
// });

test('Register a user', async ({page, request}) => {
    // Register a user
    await page.goto('/register');
    const user = await new RegistrationPage(page).registerUser(process.env.email_prefix);

    await test.step("assert the toast message", async () => {
        // assert the toast message
        await expect(page.getByText(`User ${user.firstName} ${user.lastName} registered`)).toBeVisible();
    });

    await test.step("assert the congratulation mail is sent", async () => {
        // assert the congratulation mail is sent
        await page.waitForTimeout(15000);
        const latestGmail = await GmailService.gmail(request);
        await expect(latestGmail.toString()).toEqual(`Dear ${user.firstName}, Welcome to our platform! We&#39;re excited to have you onboard. Best regards, Road to Career`);

        UserData.push(user);
        fs.writeFileSync("./utils/user-data.json", JSON.stringify(UserData, null, 2));
    });
});

test('Then login with the user', async ({page}) => {

});

