Guess-That-Country
==================

The Problem/Goal:
=================
Studying and learning can be boring or draining. The purpose of this application is to develop a fun learning game for children or students.

The Solution:
=============
The application presents a number of flags one at a time. The user must attempt to identify each Country to which the flag belongs to. The user is given positive points for correct answers and negative points for wrong answers. At the end of the game, users are able to submit their score.

Technology used:
================
- Front End framework: Backbone JS
- Back End framework: Express JS (Node JS)
- Database: MongoDB (Mongoose)

Javascript Libraries:
- Underscore
- JQuery
- JQuery UI

Precompiled CSS Tools:
- SASS

Data
====
The backend is set up as a RESTful api which communicates with the Front End to retrieve data.
Endpoints
- GET api/users
- POST api/users
- GET api/countries

Data Models that are retrieved are: 
- Country
- User

Data is stored in a MongoDB database. Data could be stored in the front end, but the data will grow with future improvements of the application and page loading speed can be effected.

Backbone MV*
===========
Application heavily use's Backbone's Views to listen for certain events. Backbone was chosen for it's simplicity and ability to create a single page application.

UX
==
Twitter's Bootstrap Framework helps give the application a clean and simple user experience. Components are positioned in the center position to keep the user's focus.

Animations were used using JQuery UI. Animations lets user know of a change in the model or if a submitted answer is valid

Tests
=====
Currently there are no tests for this application. Future improvements of the application will have Jasmine Tests to make sure independent components continue to work well.

Room For Improvement
====================
The following are ideas that is being considered for the next version of this application
- Responsive Design for mobile devices
- Better Design (Colors, Images)
- Change in game strategy: Adding levels or ability to unlock levels
- More data: To bring in the concept of Regions, or having specific flags from a specific regions
