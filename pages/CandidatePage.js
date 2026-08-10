
import { expect } from '@playwright/test';

export class CandidatePage {

    constructor(page) {

        this.page = page;

        this.name = page.locator('input[name="form_element_candidate_name370"]');

        this.mobile1 = page.locator( 'input[name="form_element_mobile_1371"]');

        this.mobile2 = page.locator('input[name="form_element_mobile_2519"]');

        this.source = page.locator('select[name^="form_element_candidate_source_id"]');

        this.exp = page.locator('input[name="form_element_experience_in_years520"]');

        this.email = page.locator('input[name="form_element_email372"]');

        this.secondaryEmail = page.locator('input[name="form_element_secondary_email522"]');

        this.jobTitle = page.locator( 'input[name="form_element_current_job_title582"]' );

        this.organization = page.locator('input[name="form_element_current_organization583"]');

        this.notice = page.locator('input[name="form_element_notice_period586"]');

        this.relevantExp = page.locator('input[name="form_element_relevant_experience587"]');

        this.resume = page.locator('input#form_element\\.resume_filename');
    }


    async fillCandidate(data) {

        await this.name.fill(data.candidateName);

        await this.mobile1.fill(String(data.mobile1));

        await this.mobile2.fill(String(data.mobile2));

        await this.source.selectOption({
            label: data.source
        });

        await expect(this.source).toHaveValue('2');

        await this.exp.fill(String(data.experience));

        await this.email.fill(data.email1);

        await this.secondaryEmail.fill(data.email2);

        await this.jobTitle.fill(data.jobTitle);

        await this.organization.fill(data.organization);

        await this.notice.fill(String(data.notice));

        await this.relevantExp.fill(
            String(data.relevantExperience)
        );

        await this.uploadResume(data.resumePath);
    }


    async uploadResume(filePath) {

        await expect(this.resume).toHaveCount(1);

        await this.resume.setInputFiles(filePath);
    }


    async createCandidatePositive(data) {

        await this.fillCandidate(data);

        // Save button
        // await this.page.getByRole('button', { name: /Submit/i  }).click();
    }


    async createCandidateNegative(data) {

    await this.fillCandidate(data);

    // Negative test data
    await this.email.fill('abc');
    await this.mobile1.fill('123');
    await this.exp.fill('-1');

    // Validate before submit
    const emailValid = await this.email.evaluate(el => el.checkValidity());
    const mobileValid = await this.mobile1.evaluate(el => el.checkValidity());
    const experienceValid = await this.exp.evaluate(el => el.checkValidity());

    console.log('Email valid:', emailValid);
    console.log('Mobile valid:', mobileValid);
    console.log('Experience valid:', experienceValid);

    await this.page.getByRole('button', { name: /Submit/i }).click();
    await this.page.waitForTimeout(1000);

   const errors = this.page.locator(
        '.invalid-feedback, .error, .text-danger, [class*="error"], .help-block'
    );

    console.log('ERROR COUNT:', await errors.count());
    console.log('ERROR MESSAGES:', await errors.allTextContents());
}

async createCandidateEdge(data) {

    await this.fillCandidate(data);

   
    await this.name.fill('A'.repeat(51));

    await this.jobTitle.fill('Q'.repeat(41));

    console.log(
        'Candidate Name length:',
        (await this.name.inputValue()).length
    );

    console.log(
        'Job Title length:',
        (await this.jobTitle.inputValue()).length
    );

    
    await expect(this.name).toHaveValue('A'.repeat(51));
    await expect(this.jobTitle).toHaveValue('Q'.repeat(41));


    await this.page.getByRole('button', { name: /Submit/i }).click();

    await this.page.waitForTimeout(1000);
}
}

