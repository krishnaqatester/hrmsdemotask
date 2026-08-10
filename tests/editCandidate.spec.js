import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CandidatePage } from '../pages/CandidatePage';
import { EditCandidatePage } from '../pages/EditCandidatePage';
import { findCandidateAndEdit } from '../utils/candidateUtils';
import { candidate } from '../fixtures/candidateData';

test.setTimeout(150000);

test('Edit Candidate', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    const editCandidatePage = new EditCandidatePage(page);


    await login.login(candidate.email, candidate.password);

  
    await dashboard.openHRProcess(candidate.homeUrl);


    await page.waitForSelector('table tbody tr');

    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    console.log(`Total Rows : ${rowCount}`);

       const candidates = {
        name: 'Krishna morrthy',
        code: '2026|CND|131',
        email: 'krishok@test.com'
    };

    const found = await findCandidateAndEdit(
        page,
        rows,
        candidates
    );

    //expect(found).toBe(true);



    await page.waitForLoadState('networkidle');

  /** 
    await page
        .locator('select[name^="form_element_candidate_status_id"]')
        .selectOption({ label: candidate.status });


    await page
        .locator('select[name^="form_element_candidate_stage_id"]')
        .selectOption({ label: candidate.stage });

   
    await page
        .locator('textarea[name^="form_element_skill_set"]')
        .fill(candidate.skill);


    **/
     
        await editCandidatePage.fillCandidate(candidate);

const buttons = page.locator('button.form_action_ele');

const count = await buttons.count();

for (let i = 0; i < count; i++) {
    const button = buttons.nth(i);


    if (await button.getAttribute('wire:click.prevent') === "store('156')") {
        await button.click();
        break;
    }
}
    await page.waitForTimeout(3000);  
});