# PetFinder

## Overview

PetFinder is a web application that helps people report, discover, and locate lost or found pets in their area.

Users can create reports, upload pet images, share location data, and browse nearby reports through an interactive map powered by Mapbox.

The goal is to make it easier for communities to reconnect pets with their owners by providing a simple and location-based reporting platform.

---

# Case Study

## 1. What problem did I solve?

Losing a pet is a stressful experience, and many people rely on scattered social media posts, local groups, or word of mouth to find missing animals.

These methods have several limitations:

* Information is fragmented across multiple platforms.
* Posts are difficult to search by location.
* There is no centralized place to report found pets.
* Communities lack a simple way to visualize nearby reports.

PetFinder solves this problem by providing a centralized platform where users can:

* Report lost pets.
* Report found pets.
* Upload photos.
* Share precise locations.
* Explore nearby reports on an interactive map.

This improves visibility and increases the chances of successful reunions.

---

## 2. How did I build it?

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion

### Mapping & Geolocation

* Mapbox GL JS
* Browser Geolocation API

### State Management

* React Context
* Custom Hooks

### Media Uploads

* Cloudinary

### Features Implemented

#### Authentication

Users can authenticate and access their personal reports.

#### Report Management

Users can:

* Create reports
* View their reports
* Update report information
* Delete reports

#### Interactive Map

Reports are displayed as markers on a map.

Users can:

* Explore nearby reports
* View report previews
* Open detailed report information
* Navigate to the user's current location

#### Image Uploads

Pet images are uploaded to Cloudinary and linked to reports.

#### Responsive Design

The application is optimized for both mobile and desktop devices.

---

## 3. What did I learn?

This project helped me strengthen several frontend engineering skills:

### Working with Real APIs

I learned how to:

* Handle authentication flows
* Manage access tokens
* Integrate frontend and backend systems
* Handle API errors effectively

### Geolocation and Maps

I gained practical experience with:

* Mapbox
* Coordinate systems
* User geolocation
* Location-based filtering

### State Management

I improved my understanding of:

* React Context
* Custom hooks
* Shared application state

### File Upload Workflows

I implemented image uploads using Cloudinary and learned how to manage media assets in production environments.

### Deployment

While deploying the application, I encountered and resolved issues related to:

* Environment variables
* Production builds
* Vercel configuration
* API communication

### Building Production-Ready Applications

Most importantly, I learned how to take an application from an initial idea to a complete product by:

* Designing the user flow
* Building reusable components
* Debugging production issues
* Improving user experience through iterative development

---

# Future Improvements

* Real-time notifications
* Chat between users
* Advanced search and filters
* Push notifications
* Report status updates
* Multi-language support

---

# Author

Adrián Leiva

Frontend Developer

Built with Next.js, TypeScript, Tailwind CSS, Mapbox, and Cloudinary.
