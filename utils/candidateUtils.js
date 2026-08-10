export async function findCandidateAndEdit(page, rows, candidate) {

    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {

        const row = rows.nth(i);

        // Ignore empty-state row
        if (
            await row
                .getByText('No items found. Try narrowing your search.')
                .count()
        ) {
            continue;
        }

        const name = (
            await row.locator('td').nth(2).innerText()
        ).trim();

        const code = (
            await row.locator('td').nth(3).innerText()
        ).trim();

        const email = (
            await row.locator('td').nth(5).innerText()
        ).trim();

        console.log(`Row ${i}: ${name} | ${code} | ${email}`);

        if (
            name === candidate.name &&
            code === candidate.code &&
            email === candidate.email
        ) {

            await row.locator('button.fa-bars').click();

            await page.getByRole('link', {
                name: 'Edit Candidate'
            }).click();

            return true;
        }
    }

    return false;
}