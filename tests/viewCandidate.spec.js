import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CandidatePage } from '../pages/CandidatePage';
import { EditCandidatePage } from '../pages/EditCandidatePage';

import { candidate } from '../fixtures/candidateData';

test.setTimeout(150000);

test('View Candidate', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.login(candidate.email, candidate.password);

  
    await dashboard.openHRProcess(candidate.homeUrl);


    const rows = page.locator('table tbody tr');

  
     const row = rows.filter({
      has: page.locator(`td:has-text("krishok@test.com")`)
  });

         
   await row.locator('button.fa-bars').click();
    await page.getByRole('link', { name: 'View' }).click();

        
         await page.waitForLoadState('networkidle');


    
           await page.waitForTimeout(3000);
});
