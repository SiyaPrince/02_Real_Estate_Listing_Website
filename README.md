# LarHub

**LarHub** is a modern, responsive real estate marketplace frontend built with **HTML5, CSS3, and Vanilla JavaScript**.

The project demonstrates how a complete property platform can be designed without relying on a frontend framework. It includes a public property marketplace, property search and filtering, property details, agent discovery, authentication interfaces, user dashboards, agent property-management tools, and administrative moderation interfaces.

LarHub was designed around a simple principle:

> **Properties provide personality. The interface provides clarity.**

The project currently represents a complete **frontend implementation and portfolio demonstration**. Backend services, production authentication, database persistence, and real property-management APIs are intentionally separated as future integration work.

---

## Table of Contents

* [Overview](#overview)
* [Project Goals](#project-goals)
* [Features](#features)
* [Application Areas](#application-areas)
* [Technology Stack](#technology-stack)
* [Architecture](#architecture)
* [Project Structure](#project-structure)
* [Public Marketplace](#public-marketplace)
* [Property Search](#property-search)
* [Property Details](#property-details)
* [Agents](#agents)
* [Authentication](#authentication)
* [User Application](#user-application)
* [Agent Application](#agent-application)
* [Admin Application](#admin-application)
* [Property Status Architecture](#property-status-architecture)
* [Demo Data and Local Storage](#demo-data-and-local-storage)
* [Responsive Design](#responsive-design)
* [Accessibility](#accessibility)
* [Imagery](#imagery)
* [Running the Project](#running-the-project)
* [Development Principles](#development-principles)
* [Testing and QA](#testing-and-qa)
* [Current Limitations](#current-limitations)
* [Future Development](#future-development)
* [Portfolio Value](#portfolio-value)

---

# Overview

LarHub is a fictional South African real estate platform designed to support several different marketplace participants:

* property seekers
* buyers
* renters
* property agents
* marketplace administrators

The public experience focuses on helping users discover properties clearly and efficiently.

The broader application demonstrates how the same frontend architecture can support multiple roles without turning the project into a collection of disconnected pages.

The primary marketplace journey is:

```text
Home
↓
Search
↓
Properties
↓
Filter / Sort
↓
Property Details
↓
Agent
↓
Enquiry
```

Additional application areas extend the platform into:

```text
User Workspace
Agent Workspace
Admin Workspace
```

---

# Project Goals

LarHub was created to demonstrate more advanced frontend engineering concepts than a traditional static website.

The main goals were to practice:

* application architecture with Vanilla JavaScript
* reusable UI components
* data-driven rendering
* service-layer architecture
* state management without a framework
* URL-based search state
* filtering and sorting
* pagination
* local persistence
* role-based interface design
* complex forms
* responsive application layouts
* accessibility
* modular CSS
* ES modules
* progressive enhancement
* separation between frontend and backend responsibilities

The project intentionally avoids React, Vue, Angular, or other frameworks.

This allows the underlying frontend concepts to remain visible rather than being hidden behind framework abstractions.

---

# Features

LarHub includes a complete frontend interface across four major application areas.

### Public marketplace

* responsive homepage
* property search
* Buy and Rent discovery
* property listing catalogue
* property filtering
* sorting
* pagination
* URL-based search state
* removable filter chips
* property detail pages
* property galleries
* image lightbox
* property saving
* recently viewed properties
* property enquiry forms
* viewing request forms
* agent directory
* agent profiles
* About page
* Contact page

### Authentication UI

* Sign In
* Registration
* Forgot Password
* password visibility controls
* form validation
* Google authentication UI
* Facebook authentication UI
* Apple authentication UI
* clearly separated Demo Access

### User application

* dashboard overview
* saved properties
* recently viewed properties
* enquiries
* profile management

### Agent application

* dashboard overview
* property listings
* Add Property
* Edit Property
* listing lifecycle management
* enquiries
* performance overview
* agent profile management

### Admin application

* dashboard overview
* property moderation
* agent management
* user management
* marketplace activity
* platform settings

---

# Application Areas

LarHub is structured as several connected frontend experiences.

```text
LARHUB
│
├── PUBLIC MARKETPLACE
│   ├── Home
│   ├── Properties
│   ├── Property Details
│   ├── Agents
│   ├── Agent Profile
│   ├── About
│   └── Contact
│
├── AUTHENTICATION
│   ├── Login
│   ├── Register
│   └── Forgot Password
│
├── USER APPLICATION
│   ├── Overview
│   ├── Saved Properties
│   ├── Enquiries
│   ├── Recently Viewed
│   └── Profile
│
├── AGENT APPLICATION
│   ├── Overview
│   ├── Listings
│   ├── Add Property
│   ├── Edit Property
│   ├── Enquiries
│   ├── Performance
│   └── Profile
│
└── ADMIN APPLICATION
    ├── Overview
    ├── Property Moderation
    ├── Users
    ├── Agents
    ├── Activity
    └── Settings
```

---

# Technology Stack

LarHub deliberately uses a lightweight frontend stack.

```text
HTML5
CSS3
Vanilla JavaScript
ES Modules
localStorage
URLSearchParams
IntersectionObserver
DOM APIs
```

### HTML

HTML provides:

* semantic document structure
* accessible forms
* navigation landmarks
* page structure
* content hierarchy

### CSS

CSS provides:

* design tokens
* responsive layouts
* component styling
* application shells
* grid systems
* typography
* interactive states
* responsive navigation
* reduced-motion support

### JavaScript

JavaScript handles:

* component rendering
* property data
* search state
* filtering
* sorting
* pagination
* gallery behavior
* saved properties
* recently viewed properties
* demo enquiries
* authentication UI behavior
* dashboards
* property management
* moderation interfaces
* local persistence

---

# Architecture

LarHub follows a layered frontend architecture.

```text
UI
↓
Page Modules
↓
Feature Logic
↓
Services
↓
Data Sources
```

This separation is important because the project currently uses local demonstration data, but the UI is designed so that those data sources can eventually be replaced by real APIs.

For example:

```text
Property Page
↓
Property Service
↓
Demo Property Data
```

could later become:

```text
Property Page
↓
Property Service
↓
REST API
↓
Backend
↓
Database
```

The page itself should not need to understand where the property data originates.

---

# Project Structure

The project follows a modular structure similar to:

```text
larhub/
│
├── index.html
├── properties.html
├── property.html
├── agents.html
├── agent.html
├── about.html
├── contact.html
│
├── auth/
│   ├── login.html
│   ├── register.html
│   └── forgot-password.html
│
├── user/
│   ├── index.html
│   ├── saved.html
│   ├── enquiries.html
│   ├── recently-viewed.html
│   └── profile.html
│
├── agent/
│   ├── index.html
│   ├── listings.html
│   ├── property-form.html
│   ├── enquiries.html
│   ├── performance.html
│   └── profile.html
│
├── admin/
│   ├── index.html
│   ├── properties.html
│   ├── agents.html
│   ├── users.html
│   ├── activity.html
│   └── settings.html
│
├── assets/
│   └── images/
│       ├── home/
│       ├── properties/
│       ├── agents/
│       ├── about/
│       └── auth/
│
├── css/
│   ├── main.css
│   ├── tokens.css
│   ├── base.css
│   ├── typography.css
│   ├── layout.css
│   ├── utilities.css
│   │
│   ├── components/
│   └── pages/
│
├── js/
│   ├── main.js
│   │
│   ├── components/
│   ├── data/
│   ├── features/
│   ├── pages/
│   ├── services/
│   └── utils/
│
├── docs/
│   ├── PROJECT_STATE.md
│   ├── PROJECT_STRUCTURE.txt
│   ├── QA_CHECKLIST.md
│   ├── IMAGE_ASSET_INVENTORY.md
│   └── BACKEND_INTEGRATION_NOTES.md
│
└── README.md
```

---

# Public Marketplace

The public marketplace is the primary LarHub experience.

Its navigation includes:

```text
LarHub
Buy
Rent
Agents
About
Contact
Sign In
```

The public interface prioritizes property discovery rather than account-management functionality.

---

# Homepage

The homepage introduces LarHub and provides the main entry point into property discovery.

The hero includes:

* marketplace positioning
* primary headline
* supporting description
* property search
* property imagery

The main search supports:

```text
Looking to
Location
Property Type
Search Properties
```

Additional homepage sections include:

* featured properties
* Buy/Rent discovery
* popular locations
* marketplace value proposition
* Browse Properties CTA

The homepage uses responsive layouts that adapt the hero, search form, cards, and imagery for smaller screens.

---

# Property Search

The Properties page provides the main marketplace discovery experience.

Users can filter by:

* listing type
* property type
* location
* minimum price
* maximum price
* bedrooms
* bathrooms

Additional filters can support features such as:

* parking
* garden
* pool
* security
* solar
* balcony
* garage

Search logic follows:

```text
Across filter categories = AND
Within multi-select categories = OR
```

For example:

```text
Johannesburg
AND
(House OR Townhouse)
AND
3+ Bedrooms
```

---

## URL-Based Search State

Search state is represented through URL query parameters.

A filtered page may conceptually look like:

```text
properties.html?listing=sale&location=Johannesburg&type=house
```

This provides several benefits:

* filtered searches can be bookmarked
* searches can be shared
* browser navigation behaves more naturally
* refreshing the page can preserve search context

---

# Sorting

Property results support sorting such as:

```text
Most Relevant
Price: Low to High
Price: High to Low
Newest
```

---

# Pagination

LarHub uses traditional pagination rather than infinite scrolling.

This provides:

* predictable navigation
* easier browser history
* clear result boundaries
* improved accessibility
* simpler future backend integration

---

# Property Cards

Property Cards are reusable components used throughout the application.

They appear in:

* Home
* Properties
* Agent Profile
* Saved Properties
* Recently Viewed
* Similar Properties

Cards can display:

* property image
* public status
* price
* title
* location
* key property facts
* save control

Property facts adapt according to the property type.

For example, residential properties may display:

```text
3 beds
2 baths
180 m²
```

while land or commercial properties can display more appropriate information.

This prevents the component architecture from assuming every property is residential.

---

# Property Details

The Property Details page provides a deeper evaluation experience.

It includes:

* breadcrumb navigation
* image gallery
* public property status
* property title
* location
* price
* reference number
* key facts
* description
* property features
* agent information
* enquiry form
* viewing request form
* location context
* similar properties

---

## Property Gallery

Properties support multiple images.

The gallery includes:

* primary image
* supporting images
* image count
* View All Photos control
* lightbox
* previous/next navigation
* close control
* keyboard interaction

The lightbox supports keyboard-oriented interaction such as:

```text
Escape → Close
Left Arrow → Previous
Right Arrow → Next
```

---

# Agents

LarHub includes a dedicated public Agent Directory.

Agent cards display information such as:

* portrait
* name
* agency
* service areas
* active listing count
* profile link

Agent profiles provide:

* portrait
* biography
* agency
* areas served
* specialisations
* contact information
* active public listings

Only active public listings contribute to the public listing count.

Internal records such as Draft, Sold, Rented, or Archived properties are not presented as active public listings.

---

# Authentication

LarHub includes complete frontend interfaces for:

* Login
* Registration
* Forgot Password

Authentication UI includes:

* visible labels
* validation
* password visibility controls
* password confirmation
* account-type selection
* accessible error states

---

## Social Authentication UI

The interface includes controls for:

```text
Google
Facebook
Apple
```

These represent the intended production interface.

They are **not currently connected to real OAuth providers**.

The frontend does not pretend that authentication has succeeded when those services are unavailable.

---

# Demo Access

LarHub includes a separate Demo Access mechanism.

Demo Access allows the frontend portfolio to demonstrate role-specific interfaces without pretending that real authentication exists.

Available demonstration roles include:

```text
Property Seeker
Agent
Admin
```

Demo Access is explicitly different from production authentication.

```text
Login / Register / OAuth
= intended production authentication UI

Demo Access
= local frontend portfolio mechanism
```

---

# User Application

The User Application represents the property seeker's personal workspace.

It contains:

```text
Overview
Saved Properties
Enquiries
Recently Viewed
Profile
```

---

## User Dashboard

The dashboard provides a summary of user activity.

It can include:

* saved property count
* enquiry count
* recently viewed count
* recent activity
* saved-property previews

---

## Saved Properties

Users can save properties from public marketplace interfaces.

Saved property IDs are persisted locally.

The Saved Properties workspace reuses the same Property Card architecture used by the public marketplace.

---

## Recently Viewed

Opening a valid property can add it to a recently viewed history.

This allows the user workspace to demonstrate browsing history without requiring a backend.

---

## Enquiries

Property enquiry and viewing-request interactions can create local demonstration records.

These records exist only in the browser.

LarHub does **not** falsely claim that:

* an email was sent
* an agent received the enquiry
* a viewing was scheduled

A real implementation would connect these interfaces to backend services.

---

# Agent Application

The Agent Application demonstrates a property-management workspace.

It contains:

```text
Overview
My Listings
Add Property
Edit Property
Enquiries
Performance
Profile
```

---

## Agent Listings

Agents can manage demonstration property records through lifecycle states such as:

```text
Draft
Published
Under Offer
Sold
Rented
```

Management interfaces intentionally support Sold and Rented states even though these properties are not considered active public marketplace listings.

---

## Add and Edit Property

LarHub uses a shared Property Form architecture for both creation and editing.

The form can contain sections for:

```text
Basic Information
Location
Property Details
Features
Description
Images
Listing Settings
```

Fields adapt according to property type where appropriate.

For example, a land listing should not require bedroom and bathroom fields simply because residential listings use them.

---

## Agent Performance

The Performance area intentionally avoids invented analytics.

It focuses on metrics that can be supported by the demonstration state, such as:

* published listings
* properties under offer
* Sold/Rented records
* listing lifecycle distribution
* locally recorded enquiries

The project does not invent:

* revenue
* impressions
* conversion rates
* traffic
* production lead statistics

---

# Admin Application

The Admin Application demonstrates marketplace governance and moderation.

It includes:

```text
Overview
Property Moderation
Users
Agents
Activity
Settings
```

The Admin interface is intentionally more operational and data-focused than the public marketplace.

---

## Property Moderation

Administrative moderation can demonstrate states such as:

```text
Pending Review
Approved
Rejected
Flagged
Removed
```

Moderation actions may include:

* approve
* reject
* flag
* remove

Actions that require explanations can request a reason.

For example:

```text
Incomplete listing
Incorrect information
Misleading content
Poor images
Duplicate listing
Policy violation
Other
```

These operations modify frontend demonstration state only.

---

## User Management

Administrative user states can include:

```text
Active
Suspended
Disabled
```

Possible actions include:

* View
* Suspend
* Reactivate

Permanent deletion is intentionally not treated as a casual default administrative action.

---

## Agent Management

Agent management can demonstrate states such as:

```text
Pending Approval
Approved
Rejected
Suspended
```

The project avoids inventing regulatory verification requirements that have not been defined.

---

# Property Status Architecture

One important LarHub design decision is the separation of different types of property status.

These concepts are not treated as one generic status field.

Conceptually:

```text
Property
├── publicStatus
├── lifecycleStatus
└── moderationStatus
```

---

## Public Status

Public users may encounter statuses such as:

```text
FOR SALE
TO RENT
NEW
UNDER OFFER
```

Featured can also be used as merchandising metadata.

---

## Agent Lifecycle Status

Agent management can include:

```text
DRAFT
PUBLISHED
UNDER OFFER
SOLD
RENTED
ARCHIVED
```

---

## Admin Moderation Status

Administrative workflows can include:

```text
PENDING REVIEW
APPROVED
REJECTED
FLAGGED
REMOVED
```

---

## Sold and Rented Properties

A key platform rule is:

> **Sold and Rented properties are management states, not active public discovery states.**

They may appear inside Agent or Admin interfaces but should normally disappear from active marketplace discovery.

This keeps public availability separate from historical management information.

---

# Demo Data and Local Storage

LarHub uses browser-local storage to demonstrate persistent frontend behavior.

Example storage areas include:

```text
larhub.savedProperties
larhub.recentlyViewed
larhub.demoEnquiries
larhub.demoUserProfile
larhub.demoSession
larhub.demoAgentListings
larhub.demoAgentProfile
```

Additional administrative demonstration state may also be stored locally.

---

## Why IDs Are Stored

Where practical, LarHub stores identifiers rather than duplicating entire domain objects.

For example:

```text
larhub.savedProperties
```

stores property IDs.

The application can then retrieve the current property information through the Property Service.

This avoids unnecessarily duplicating property records.

---

# Responsive Design

LarHub was designed for:

* mobile
* large mobile
* tablet
* desktop
* large desktop

The responsive system is content-driven rather than based purely on device names.

Conceptual ranges include:

```text
< 640px
Mobile

640px – 767px
Large mobile / small tablet

768px – 1023px
Tablet

1024px – 1279px
Desktop

1280px+
Large desktop
```

---

## Responsive Property Grid

Property results adapt approximately as follows:

```text
Desktop
3 columns

Tablet
2 columns

Mobile
1 column
```

The filter sidebar becomes a mobile filter interface when screen space becomes limited.

---

## Responsive Application Shell

User, Agent, and Admin interfaces use a shared application-shell architecture.

Desktop interfaces use persistent navigation where appropriate.

Smaller screens use an accessible mobile navigation pattern rather than squeezing the desktop sidebar into the viewport.

---

# Accessibility

Accessibility was treated as part of the component architecture rather than a final add-on.

The project includes practices such as:

* semantic HTML
* labelled forms
* keyboard-accessible controls
* visible focus states
* `:focus-visible`
* image alternative text
* accessible navigation
* meaningful button labels
* validation messages
* dialog/drawer focus handling
* reduced-motion support

LarHub also respects:

```css
@media (prefers-reduced-motion: reduce)
```

to minimize unnecessary motion when requested by the operating system.

---

# Imagery

LarHub uses explicit image elements for meaningful property and agent imagery.

The project includes imagery for:

* homepage hero
* property cards
* property galleries
* agent portraits
* About page
* authentication interfaces

Property Cards use a consistent image ratio.

Agent Cards use consistent portrait framing.

Fallback imagery remains available for locally created demonstration records that do not yet have uploaded media.

The image architecture is documented in:

```text
docs/IMAGE_ASSET_INVENTORY.md
```

---

# Design System

LarHub uses a restrained architectural visual language.

The main brand color is a deep architectural green.

Example design tokens include:

```text
Primary              #173F35
Primary Hover        #0F3028
Primary Soft         #E7EFEC

Background           #F7F6F2
Surface              #FFFFFF
Secondary Surface    #F0F0EB

Primary Text         #1D211F
Secondary Text       #606762
Muted Text           #7B827E

Border               #DADDD9
Strong Border        #B8BDB9
```

Semantic colors are reserved for information such as:

* success
* warning
* error
* informational states

Status is never intended to rely on color alone.

---

# Typography

LarHub primarily uses a clean sans-serif typography system.

The visual hierarchy includes:

* display text
* page headings
* section headings
* card headings
* body copy
* labels
* captions

Typography is responsive and uses balanced wrapping where appropriate.

---

# Running the Project

LarHub uses ES modules.

Because of this, the project should be served through a local HTTP server rather than opened directly using `file://`.

---

## Option 1 — Python

If Python is installed:

```bash
cd larhub
python -m http.server 5500
```

On Windows, this can also be:

```powershell
cd larhub
py -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

---

## Option 2 — VS Code Live Server

If you use Visual Studio Code:

1. Open the LarHub project folder.
2. Install the **Live Server** extension if necessary.
3. Open `index.html`.
4. Select **Open with Live Server**.

---

# Development Principles

Several engineering principles guided the project.

## Separation of concerns

```text
HTML
= structure and meaning

CSS
= presentation and layout

JavaScript
= behavior and application logic
```

---

## Modular JavaScript

Responsibilities are separated into:

```text
components
features
services
data
utilities
page modules
```

Large application behavior is not placed into one global JavaScript file.

---

## Service boundaries

Pages do not directly own all application data.

Instead:

```text
Page
↓
Service
↓
Data Source
```

This makes future API integration substantially easier.

---

## Reusable components

LarHub reuses meaningful domain components such as:

* Property Card
* Agent Card
* public navigation
* application navigation
* search controls
* forms
* status indicators
* empty states

The goal is meaningful reuse rather than abstraction for its own sake.

---

## Progressive enhancement

HTML provides the structural foundation.

JavaScript adds richer functionality where needed.

The project avoids rendering every static element through JavaScript simply because JavaScript is available.

---

## No Fake Backend Functionality

One of LarHub's most important development rules is that the frontend should not pretend that backend functionality exists.

For example, the project does not falsely claim that:

* authentication succeeded
* OAuth succeeded
* an account was created on a server
* an enquiry was delivered
* a viewing was scheduled
* a property was persisted to a database
* an administrator changed production data

Where local demonstration behavior exists, it is treated as **demo state**.

---

# Testing and QA

LarHub underwent static project auditing throughout development.

Checks included:

* HTML file references
* JavaScript imports
* CSS imports
* page titles
* viewport metadata
* main landmarks
* heading structure
* duplicate IDs
* image references
* image alternative text
* shared-shell consistency
* public property eligibility
* Sold/Rented visibility rules
* authentication honesty
* JavaScript syntax validation
* responsive architecture review

JavaScript files were also checked using:

```bash
node --check
```

Additional QA documentation is available in:

```text
docs/QA_CHECKLIST.md
```

and project state information is available in:

```text
docs/PROJECT_STATE.md
```

---

# Current Limitations

LarHub is currently a **frontend application demonstration**.

It does not yet include:

* production backend
* database
* real authentication
* real OAuth
* server-side sessions
* authorization
* persistent cloud storage
* real property image uploads
* real enquiry delivery
* email notifications
* viewing scheduling backend
* production moderation
* audit logs
* real analytics
* payment processing

These are intentionally treated as future system integrations rather than simulated production functionality.

---

# Future Development

The existing frontend architecture provides a foundation for future full-stack development.

A possible architecture could evolve into:

```text
LarHub Frontend
      ↓
REST / GraphQL API
      ↓
Authentication
      ↓
Application Services
      ↓
Database
      ↓
Object Storage
```

Potential future additions include:

### Backend

* Node.js / Express
* Python / FastAPI
* another suitable backend framework

### Database

* PostgreSQL
* Supabase
* Firebase
* another relational/cloud database

### Authentication

* email/password authentication
* Google OAuth
* Facebook OAuth
* Apple authentication
* role-based authorization

### Property Management

* persistent listings
* image uploads
* cloud image storage
* moderation workflows
* listing history

### Communication

* real enquiries
* email notifications
* agent notifications
* viewing scheduling

### Administration

* persistent moderation
* audit logs
* role management
* marketplace reporting

### Search

Future marketplace search could eventually support:

* database-backed filtering
* full-text search
* geospatial search
* map search
* saved searches
* search alerts

---

# Portfolio Value

LarHub demonstrates frontend development beyond simple static page construction.

The project includes examples of:

* application-scale Vanilla JavaScript
* modular architecture
* reusable components
* service-layer design
* domain modelling
* data-driven rendering
* search/filter algorithms
* sorting
* pagination
* URL state
* local persistence
* multiple application roles
* lifecycle modelling
* moderation workflows
* responsive application design
* complex forms
* accessibility
* design-system implementation
* honest frontend/backend boundaries

It demonstrates the ability to think about a frontend as an **application system**, rather than simply a collection of webpages.

---

# Project Status

```text
Product Planning             Complete
UX Architecture              Complete
Design System                Complete
Frontend Foundation          Complete
Public Marketplace           Complete
Property Discovery           Complete
Property Details             Complete
Agents                       Complete
Authentication UI            Complete
User Application             Complete
Agent Application            Complete
Admin Application            Complete
Responsive Design            Complete
Imagery Integration          Complete
Frontend QA                  Complete
Backend Integration          Future
Production Authentication   Future
Database                     Future
Deployment                   Future
```

---

# Author

Developed as a frontend software development and portfolio project.

---

# License

No open-source license has been assigned to this project unless a `LICENSE` file is included in the repository.

All rights are reserved by default.
