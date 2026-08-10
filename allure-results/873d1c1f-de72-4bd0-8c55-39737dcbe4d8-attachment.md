# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: createCandidateEdge.spec.js >> Create Candidate - Edge Case
- Location: tests\createCandidateEdge.spec.js:10:5

# Error details

```
Test timeout of 150000ms exceeded.
```

```
Error: locator.click: Test timeout of 150000ms exceeded.
Call log:
  - waiting for locator('.widget-user-header.bg-info')

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - generic [ref=f1e3]: "429"
  - generic [ref=f1e4]: Too Many Requests
```

# Test source

```ts
  1  | export class DashboardPage {
  2  | 
  3  |     constructor(page) {
  4  | 
  5  |         this.page = page;
  6  | 
  7  |         this.hrCard = page.locator('.widget-user-header.bg-info');
  8  |         
  9  |     }
  10 |      
  11 |       hrProcessLink(url) {
  12 |         return this.page.locator(`a[href="${url}"]`);
  13 |     }
  14 | 
  15 |     async openHRProcess(url) {
  16 | 
> 17 |         await this.hrCard.click();
     |                           ^ Error: locator.click: Test timeout of 150000ms exceeded.
  18 | 
  19 |        // await this.hrProcess.click();
  20 |        await this.hrProcessLink(url).click();
  21 | 
  22 |         await this.page.waitForLoadState('networkidle');
  23 | 
  24 |     }
  25 | 
  26 | }
```