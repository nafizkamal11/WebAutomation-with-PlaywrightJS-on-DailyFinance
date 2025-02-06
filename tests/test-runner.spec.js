import {test, expect} from '@playwright/test';
import fs from 'fs';
import {config} from "dotenv";

config();

import RegistrationPage from "../page/RegistrationPage.js";
import GmailService from '../service/gmail-service';
import LoginPage from "../page/LoginPage.js";

import UserData from "../utils/user-data.json" assert {type: "json"};
import ItemData from "../utils/item-data.json" assert {type: "json"};
import ItemPage from "../page/ItemPage.js";

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

test.only('Then login with the user', async ({page}) => {
    // Then login with the user
    await page.goto('/login');
    const latestUser = await UserData[UserData.length - 1];
    console.log(latestUser);
    console.log(latestUser.email);
    console.log(latestUser.password);
    await new LoginPage(page).loginForm(latestUser.email, latestUser.password);
    await expect(page.getByText('Dashboard')).toBeVisible()

    await test.step("add random 2 items", async () => {
        // add random 2 items
        while (ItemData.length > 0)
            ItemData.pop();

        const itemPage = await new ItemPage(page);
        await itemPage.addItem();
        await itemPage.addItem();
    });

    await test.step("assert that 2 items are showing on the item list", async () => {
        const searchBox = await page.getByRole('textbox', {name: 'Search items...'});
        await searchBox.fill(ItemData[0].itemName);
        await expect(page.getByText('Total Rows:')).toContainText("Total Rows: 1")
        await searchBox.clear();
        await searchBox.fill(ItemData[1].itemName);
        await expect(page.getByText('Total Rows:')).toContainText("Total Rows: 1")
    });

    await page.pause();
});

