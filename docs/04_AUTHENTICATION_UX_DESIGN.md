# LarHub — Authentication UX Design

## 1. Purpose

This document defines the complete intended authentication interface for LarHub while keeping
real authentication/provider integration deferred until backend work begins.

The objective is to avoid redesigning the authentication frontend later.

---

## 2. Authentication Pages

```text
AUTHENTICATION
├── Login
├── Register
└── Forgot Password
```

---

## 3. Shared Auth Shell

```text
AuthShell
├── LarHub Brand
├── Optional Property / Brand Image
└── Auth Content
```

Desktop may use a split layout with meaningful imagery.

Tablet reduces image prominence.

Mobile may remove the image entirely if it compromises the form experience.

Auth pages do not need the full public navigation.

A simple:

```text
← Back to marketplace
```

may be used.

---

## 4. Login

### Structure

```text
LarHub

Welcome back

Email
[                         ]

Password
[                         ] [ Show ]

Forgot Password

[ Sign In ]

────────── OR ──────────

[ Continue with Google ]

[ Continue with Facebook ]

[ Continue with Apple ]

Don't have an account?
Register
```

### Frontend Validation

- Email required
- Valid email format
- Password required

Do not fake server-side errors such as:

- Incorrect password
- Account suspended
- Account does not exist

until a real authentication system can determine those states.

---

## 5. Register

### Fields

```text
Full Name
Email
Phone
Password
Confirm Password
Account Type
```

Account type:

```text
○ Property Seeker
○ Property Agent
```

### Social Options

```text
────────── OR ──────────

[ Continue with Google ]
[ Continue with Facebook ]
[ Continue with Apple ]
```

### Validation

- Required fields
- Valid email
- Valid phone format
- Minimum password length
- Password confirmation match
- Account type selected

Only display password-strength feedback if it is genuinely calculated.

---

## 6. Agent Registration Principle

Selecting `Property Agent` must not imply automatic trusted-agent approval.

Conceptual future flow:

```text
Register as Agent
↓
Agent Application / Onboarding
↓
Pending Approval
↓
Admin Review
↓
Approved / Rejected
```

Additional details such as:

- Agency
- Areas served
- Professional information

may be collected during later onboarding rather than making the first registration form
unnecessarily large.

---

## 7. Forgot Password

```text
Forgot your password?

Enter your email address.

Email
[                         ]

[ Continue ]

Back to Sign In
```

Frontend validates the email.

Without backend integration, do not display:

```text
Reset email sent.
```

Instead communicate truthfully that password recovery is not connected in the frontend build.

---

## 8. Social Authentication

The intended finished interface includes:

- Google
- Facebook
- Apple

These controls should exist from the initial frontend implementation.

Reason:

```text
Design final intended UI now
↓
Later connect provider flow
↓
Avoid layout redesign
```

### Frontend-Only Behaviour

Clicking a social provider must not simulate successful authentication.

Appropriate informational feedback:

```text
Google authentication is not connected
in this frontend build.
```

Equivalent messaging applies to Facebook and Apple.

---

## 9. Social Button Hierarchy

Social buttons are secondary authentication actions.

They should be visually complete but should not overwhelm the primary LarHub action.

Conceptual:

```text
┌────────────────────────────┐
│ G  Continue with Google    │
└────────────────────────────┘

┌────────────────────────────┐
│ f  Continue with Facebook  │
└────────────────────────────┘

┌────────────────────────────┐
│   Continue with Apple     │
└────────────────────────────┘
```

Use accessible provider names rather than relying on logos alone.

---

## 10. Shared Auth Components

Conceptual component family:

```text
AuthForm
├── FormField
├── PasswordField
├── PasswordToggle
├── FormStatus
├── PrimaryAction
├── SocialAuthGroup
└── SecondaryLinks
```

Potential autocomplete values should be used appropriately:

- `name`
- `email`
- `tel`
- `current-password`
- `new-password`

---

## 11. Authentication UI State

Conceptual state:

```text
Idle
↓
Typing
↓
Invalid / Valid
↓
Submitting
↓
Result
```

In the frontend-only phase, `Result` must remain truthful.

The frontend may know:

- Field is empty
- Email syntax is invalid
- Password confirmation does not match

The frontend does **not** know:

- Credentials are correct
- User exists
- Provider accepted authentication
- Account is suspended

unless a backend/provider is connected.

---

## 12. Demo Session Option

A clearly labelled demo-session mechanism may later be provided for portfolio exploration.

Possible demo roles:

- Property Seeker
- Agent
- Administrator

This must be presented as a frontend demonstration mode rather than fake real authentication.

---

## 13. Backend Integration Boundary

The intended service interface may eventually expose conceptual operations such as:

```text
login()
register()
requestPasswordReset()

loginWithGoogle()
loginWithFacebook()
loginWithApple()
```

Initially these operations may return not-connected/demo responses.

Later the service implementation can connect to real authentication APIs without requiring
major page redesign.

---

## 14. Accessibility

Authentication requirements:

- Visible labels
- Correct input types
- Password show/hide control is keyboard accessible
- Password visibility state is communicated
- Errors are associated with fields
- Focus moves appropriately after failed validation
- Social buttons have explicit provider labels
- Divider text is accessible
- Focus styling is visible
- Form order is logical
- Mobile keyboard/input hints are appropriate
