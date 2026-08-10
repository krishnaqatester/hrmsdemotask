import { expect } from '@playwright/test';

export class EditCandidatePage {

    constructor(page) {
        this.page = page;

        this.rows = page.locator('table tbody tr');

        this.editCandidate = page.getByRole('link', {
            name: 'Edit Candidate'
        });

        this.name = page.locator('input[name="form_element_candidate_name370"]');

        this.mobile1 = page.locator( 'input[name="form_element_mobile_1371"]');


          this.communicationTab = page.getByRole('link', {
            name: 'Communication'
        });
        /** 
        this.status = page.locator(
            'select[name^="form_element_candidate_status_id"]'
        );

        this.stage = page.locator(
            'select[name^="form_element_candidate_stage_id"]'
        );

        this.skill = page.locator(
            'textarea[name^="form_element_skill_set"]'
        );
        **/
    }


     async fillCandidate(data) {

        await this.name.fill(data.editcandidateName);

        await this.mobile1.fill(String(data.editmobile1));    
    }

    
        async openCommunication() {
        await this.communicationTab.click();
        await this.page.waitForLoadState('networkidle');
    }



      async createCandidateUpdate(data) {

        await this.fillCandidate(data);

        // Save button
        // await this.page.getByRole('button', { name: /Submit/i  }).click();
    }
    async openEditCandidate(candidateName) {


        const row = this.rows.filter({
            has: this.page.locator(`td:has-text("${candidateName}")`)
        });

        await expect(row).toHaveCount(1);

        await row.locator('button.fa-bars').click();

        await row.getByRole('link', {
            name: 'Edit Candidate'
        }).click();
    }

    async editCandidateDetails(data) {

        await this.openEditCandidate(data.name);
/** 
        await this.status.selectOption({
            label: data.status
        });

        await this.stage.selectOption({
            label: data.stage
        });

        await this.skill.fill(data.skill);
        **/
    }
}