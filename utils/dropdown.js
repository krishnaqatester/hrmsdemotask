
export async function selectDropdown(page, locator, option) {
  await page.locator(locator).selectOption({
    label: option
  });
}