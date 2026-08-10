# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: createCandidateNegative.spec.js >> Create Candidate - Negative
- Location: tests\createCandidateNegative.spec.js:10:5

# Error details

```
Test timeout of 150000ms exceeded.
```

```
Error: page.waitForLoadState: Test timeout of 150000ms exceeded.
```

# Page snapshot

```yaml
- navigation [ref=f1e3]:
  - list [ref=f1e5]:
    - listitem [ref=f1e6]:
      - link [ref=f1e7]:
        - /url: https://hrmsdemo.tdesk.io
        - heading "HRMS DEMO" [level=3] [ref=f1e8]
    - listitem [ref=f1e9]:
      - link "Welcome to HRMS Demo" [ref=f1e10]:
        - /url: "#"
  - list [ref=f1e11]:
    - listitem [ref=f1e12]:
      - link "" [expanded] [ref=f1e13] [cursor=pointer]:
        - /url: "#"
    - listitem [ref=f1e15]:
      - link " Krishnakumar" [expanded] [ref=f1e16] [cursor=pointer]:
        - /url: "#"
        - generic [ref=f1e17]: 
        - text: Krishnakumar
      - text:    
```

# Test source

```ts
  1  | export class LoginPage {
  2  | 
  3  |     constructor(page) {
  4  |         this.page = page;
  5  | 
  6  |         this.email = page.locator('input[type="email"]');
  7  |         this.password = page.locator('input[type="password"]');
  8  |         this.loginButton = page.getByRole('button', { name: /log in/i });
  9  |     }
  10 | 
  11 |     async login(email, password) {
  12 | 
  13 |         await this.page.goto('https://hrmsdemo.tdesk.io/login');
  14 | 
  15 |         await this.email.fill(email);
  16 |         await this.password.fill(password);
  17 | 
  18 |         await this.loginButton.click();
  19 | 
> 20 |         await this.page.waitForLoadState('networkidle');
     |                         ^ Error: page.waitForLoadState: Test timeout of 150000ms exceeded.
  21 |     }
  22 | 
  23 | }
```