# React Module Final Project

# Business Content Management Web Application

Welcome to the Business Content Management Web Application project! This application allows users to publish and manage business content on a web platform, integrating with a Rest API for server-side operations. It's designed to give you practical experience with one of the most sought-after tasks in the development and tech industry, combining knowledge and skills in both frontend and backend development.

## Project Overview

This project involves developing an internet application that includes a system for managing a site, enabling users to publish content. Different parts of the published content will be available on the website.


## Getting Started

To begin using the Business Content Management Platform, follow these simple steps:

1. **Initial Setup:** Contact our support team to set up your account and configure the initial settings tailored to your business needs.
2. **Content Management:** Log in to the CMS with your secure credentials to start publishing, editing, and organizing your content right away.
3. **Customization:** Utilize the platform's flexible design options to match your brand's aesthetics for a seamless user experience.


### To run this project locally:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.

<br> </br>

## API 
- [Users](https://documenter.getpostman.com/view/25008645/2s9YXcd5BL)
- [Cards](https://documenter.getpostman.com/view/25008645/2s9YXcd5BE)
- [Token Parsing](https://www.npmjs.com/package/jwt-decode)


## Test Business Credentials
"email": "ellvis@email.com",
"password": "Abc!123Abc"

"email": vielf@email.com
"password": Aa1234!!

## Test User Credentials
Email: viel@gmail.com
password: Aa1234!!


<br> </br>
# Version 1.0.0 - MVP
## Features
- Header
    - [X] SearchBar
        - [X] Design
        - [X] Implementation
    - [X] Light/Dark mode
- [X] Login Page
- [X] Business Card
    - [X] Can be liked/unliked
    - [X] Can be deleted
- [X] Footer
- [X] About page
- SignUp Form validation
    - [X] Passworm must be:
        - [X] Must be 8 characters long
        - [X] 1 English capital letter 
        - [X] 1 English small letter
        - [X] At least 4 numbers
        - [X] Must have one of the following special chars: *_-&^%$#@!
    - [X] Email verification
    - [X] Form fields must show success/failure visualy to user
    - [X] Add FormField for password validation - needs to be the same as previous password.
- [X] Login/SignUp
    - [X] Page Design
    - [X] Save access token across visits
    - [X] API Implementation
- Pages
    - [ ] Create New Business Card
        - [X] Form To create card
        - [X] API call finalisation
        - [ ] Form validation
    - [ ] Edit Business Card
        - [X] Form To edit card
        - [X] API call finalisation
        - [ ] Form validation
    - [X] My Created Business Cards 
    - [X] My Liked Business Cards 
    - [X] Search Page
- [ ] Accesability 

# Requirements:
- [ ] Axios - for fetching from backend.
- [X] API calls must be inside try/catch.


# Bonuses:
- [ ] Edit user details.
- [ ] CRM system.
- [ ] User blocking
    - [ ] After 3 unsuccessfull login attempts, the user is blocked for 24 hours. 
