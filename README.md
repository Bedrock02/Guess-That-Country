Guess-That-Country
==================

The Problem/Goal:
=================
Studying and learning can be boring and draining. The purpose of this application is to develop a fun learning game for children or students.

The Solution:
=============
The application presents a number of flags one at a time. The user must attempt to identify each Country to which the flag belongs to. The user is given points for correct answers and deducted points for wrong answers. At the end of the game, users are able to submit their score.

I choose to use a Javascript Stack because recently I have been heavily using Javascript at my most recent job (TuneIn). The three main views are the Home View, Country View, and End View.

The Home View is what the user sees first. To start the application the user must hit the Start button.

The Country View initially talks to the api, to retrieve the set of countries that will be used for the game. For each flag presented the user has the option to submit an answer. If the answer submitted is correct, the user is given 3 points. If incorrect, 1 point is deducted.

For each flag presented, the user has three tries to guess the country. With three incorrect answers, the application moves on to the next model. For each incorrect answer, the input box shakes horizontally. For each correct answer the user is given positive reinforcement with the text 'Correct!'. For each flag swap or transition the user is showed the name of the country that the flag belongs to.

The End View also talks to the api and retrieves all the users that submitted their score. All the users are fetched and sorted by the highscore attribute. The collection is sorted with a descending direction. After a user submits their score, the highscore collection is rendered again.  

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
- Better Design (Colors, Images)
- Change in game strategy: Adding levels or ability to unlock levels
- More data: To bring in the concept of Regions, or having specific flags from a specific regions
