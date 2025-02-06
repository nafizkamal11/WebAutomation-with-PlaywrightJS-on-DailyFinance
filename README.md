# Web Automation using PlaywrightJS

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D12-brightgreen)](https://nodejs.org/en/)
[![Playwright](https://img.shields.io/badge/Playwright-%3E%3D1.0-blue)](https://playwright.dev/)

## Overview

This project demonstrates end-to-end automation testing on the [DailyFinance](https://dailyfinance.roadtocareer.net/) website using [PlaywrightJS](https://playwright.dev/). The test suite covers multiple user interactions such as user registration, login, adding items, updating profile settings, password reset, and validating email notifications alongside UI messages.

## Table of Contents

- [Features](#features)
- [Test Scenarios](#test-scenarios)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Reporting](#reporting)
- [Additional Resources](#additional-resources)

## Features

- **Robust Test Automation:** Utilizes Playwright for reliable browser automation.
- **Data-Driven Testing:** Uses JSON files and Faker.js for generating random test data.
- **Email Verification:** Integrates with Gmail service to confirm email-based workflows.
- **Allure Reporting:** Generates detailed test reports with Allure.
- **Easy Setup:** A clear project structure with comprehensive instructions for installation and execution.


## Automation Scenarios : [Recording](https://go.screenpal.com/watch/cTn1ILnheNg)

1. **User Registration**
    - Visit [DailyFinance](https://dailyfinance.roadtocareer.net/) and register a new user.
    - Assert that a congratulatory email is sent.
    - Verify the success toast message.

2. **Login & Item Addition**
    - Login with the newly registered user.
    - Add two random items.
    - Verify that the two items are displayed on the item list.

3. **Profile Update & Logout**
    - Navigate to the profile settings.
    - Upload a profile picture.
    - Logout from the application.

4. **Password Reset**
    - Click on "Reset it here" on the login page.
    - Reset the password.

5. **Re-login Verification**
    - Login with the new password.
    - Confirm successful login.

## Project Structure

```plaintext
.
├── resources
│   └── profile.jpg             # Sample profile image for upload
├── service
│   └── gmail-service.js        # Service for handling Gmail operations
├── tests
│   └── test-runner.spec.js     # Main test suite file
├── utils
│   ├── myUtils.js              # Utility functions
│   ├── item-data.json          # Data for item addition tests
│   └── user-data.json          # Data for user registration tests
├── .gitignore                  # Specifies intentionally untracked files to ignore
├── README.md                   # Project overview and instructions
├── package-lock.json           # Auto-generated file for exact dependency versions
├── package.json                # Project dependencies and scripts
└── playwright.config.js        # Playwright test configuration
```

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/nafizkamal11/WebAutomation-with-PlaywrightJS-on-DailyFinance.git
   cd WebAutomation-with-PlaywrightJS-on-DailyFinance
   ```

2. **Install Dependencies**

   Make sure you have Node.js installed. Then, install the project dependencies:

   ```bash
   npm install
   ```

   **Installed Packages:**
    - `@playwright/test`
    - `@faker-js/faker`
    - `fs`
    - `dotenv`

## Running Tests

### Execute Playwright Tests

Run the tests using the following command:

```bash
  npx playwright test
```

### Allure Reporting

Generate the Allure report:

```bash
  allure generate ./allure-results -o ./allure-report
```

Open the Allure report in your browser:

```bash
  allure open ./allure-report
```

**Cleanup Allure Reports:**

```bash
  rm -rf allure-report/ allure-results/
```


## Reporting

- **Allure Reports:** The project integrates Allure for generating test reports. Follow the steps in the [Running Tests](#running-tests) section.

    ![image](https://github.com/user-attachments/assets/deebc8b9-7b88-4113-9f5e-aa54815850c7)
  
    ![image](https://github.com/user-attachments/assets/e00bdcca-7dac-4564-897a-63152569dfac)

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Allure Documentation](https://docs.qameta.io/allure/)
- [Faker.js Documentation](https://fakerjs.dev/)
- [DailyFinance Website](https://dailyfinance.roadtocareer.net/)

---
