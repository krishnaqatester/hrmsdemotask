import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { CandidatePage } from '../pages/CandidatePage.js';
import { candidate } from '../fixtures/candidateData';

test.setTimeout(150000);

test('Create Candidate - Positive', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const candidatePage = new CandidatePage(page);

    await login.login(candidate.email, candidate.password);

    await dashboard.openHRProcess(candidate.addUrl);

    await candidatePage.createCandidatePositive(candidate);

  //  await page.getByRole('button', { name: /Submit/i }).click();

});