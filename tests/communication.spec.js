import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CandidatePage } from '../pages/CandidatePage';
import { EditCandidatePage } from '../pages/EditCandidatePage';

import { candidate } from '../fixtures/candidateData';

test.setTimeout(150000);

test('Basic Candidate', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    const editCandidatePage = new EditCandidatePage(page);


    await login.login(candidate.email, candidate.password);

  
    await dashboard.openHRProcess(candidate.homeUrl);


    await page.waitForSelector('table tbody tr');

    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    console.log(`Total Rows : ${rowCount}`);

    let found = false;

    for (let i = 0; i < rowCount; i++) {

        const row = rows.nth(i);

        const name = (await row.locator('td').nth(2).innerText()).trim();
        const code = (await row.locator('td').nth(3).innerText()).trim();
        const email = (await row.locator('td').nth(5).innerText()).trim();

        console.log(name, code, email);

        if (
            name === 'Krishna morrthy' &&
            code === '2026|CND|131' &&
            email === 'krishok@test.com'
        ) {

            found = true;

            // Click Action button
            await row.locator('button.fa-bars').click();

            // Click Edit Candidate
            await page.getByRole('link', { name: 'Edit Candidate' }).click();

            break;
        }
    }


    await page.waitForLoadState('networkidle');


    await editCandidatePage.openCommunication();

    

   const rowd = page.locator('table tbody tr');

const rowCountd = await rowd.count();

console.log(`Total Rows: ${rowCount}`);



for (let i = 0; i < rowCountd; i++) {

    const row = rows.nth(i);

    if (
        await row
            .getByText('No items found. Try narrowing your search.')
            .count() > 0
    ) {
        console.log('No items found. Try narrowing your search.');
        continue;
    }

  
  
}



    await page.waitForTimeout(3000);  
});
