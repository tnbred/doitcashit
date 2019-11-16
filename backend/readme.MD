Do It & Cast It - Back End
==========

This is the back end for Do it & Cash it!


Integrated with Travis CI :

[![Build Status](https://secure.travis-ci.org/tnbredillet/doitcashit-backend.png)](http://travis-ci.org/tnbredillet/doitcashit-backend)


## challenges/list.js
Input: 
1) nbChallengeByPage: Number of challenges we want to display by page
2) indexPage: Index of the page you want

Output:
A vector with the following attributes{rows , nbTotalChallenges , nbTotalPages }
1) rows: challenges requested
2) nbTotalChallenges: Total number of challenges in the database
3) nbTotalPages: Total number of pages

## challenges/create.js
Input:
1) name: The name attribute of the challenge
2) goal: The goal attribute of the challenge
3) Description: The description attribute of the challenge
4) money_pledged: The money_pledged attribute of the challenge
5) currency: The currency attribute of the challenge (one of 'USD',  'EUR' or 'NONE' if no money is pledged)
6) user_id: The user_id attribute of the challenge
Note that all the input need to be given

Output:
A vector with the following attributes { challenge , error }
1) the created challenge or null in case of error
2) the error message or null if no error

## challenges/get.js
Input:
1) id: The id attribute of the challenge requested

Output:
A vector with the following attributes { challenge , error }
1) challenge is the challenge in JSON if the challenge was found, null otherwise
2) error is the error message or null if no error

## challenges/search.js
Input:
1) sentenceToSearch: a string with keyword
In the latest version, the radix of all the words of the string need to be found. The search is customized for the English language.

Output:
1) The challenges having the keywords in their description or name attribute

## challenges/trending
Input:
1) criterion. One of:
   i)   "total_pledges" for the total amount of pledges so far
   ii)  "nb_users" for the number of users following the challenge
   iii) "money_pledged" for the amount asked by the user who submitted the challenge
   iv)  "most_recent" to order the challenges by date of creation
2) nbChallengesToDisplay: The total number of challenges to send. If null, the default is 3.

Output:
An array with the first nbChallengesToDisplay challenges ordered according to the requested criterion

## users/login
Input:
1) email: The email of the user trying to login
2) password: The password of the user trying to login

Output: 
a vector with the following attributes: {user, error}
1) user: The user if the authentification is a succes and null otherwise
2) error: The error message in case of failure and null otherwise
Note that if the login is a success, the login_count of the user is incremented as the lastlogin_at is updated

## users/signup.js
Input:
1) name: The name attribute of the user
2) email: The goal attribute of the user
3) birth_date: The birth_date attribute of the user
4) password: The birth_date attribute of the user
5) password_confirmation: A confirmation of the password

Output:
A vector with the following attributes { user , error }
1) the created challenge or null in case of error
2) the error message or null if no error


## pledges/create.js
Input:
1) pledged: The pledge attribute of the challenge_user
2) currency: The currency attribute of the challenge_user
3) user_id: The id of the user sending the pledge
4) challenge_id: the id of the pledged challenge

Output
A vector with the following attributes { pledge, error }
1) the created challenge_user or null in case of error
2) the error message or null if no error
Note that the total_pledge_so_far attribute of the challenge is updated 


############################
###  The doitcashit-lib, ###
############################
the files challenges.js, user.js and pledge.js contains the attributes
of the different models used in the app. These attributes are the same as
the columns of the tables of the database

The file helper_functions .js contains functions meant to help the manipulations
of the different models. They are mostly used in the files 
models/user.js , models/pledge.js , models/challenge.js

the main helper functions are 

## sanitize
Input: 
1) Model: A Model (User, Challenge, ... )
2) Data: the data to sanitize, with supposedly the same attributes as the provided Model.

Output:
An array containing the sanitized data. It means that the input data is checked. Any key of the data that is
not an attribute of the model is not considered. Some default values are also set if not provided.

## save_sanitize
Input:
1) Model: A Model (User, Challenge, ... )
2) Data: the data used to create the new instance of the model
3) callback: the callback function called after the new instance is save

This function creates and saves a new model with the attributes provided in "data". 
The function first "sanitizes" the provided data

## update_sanitize
Input:
1) Model: A Model (User, Challenge, ... )
2) id: the id of the model to update
2) Data: the new attributes
3) callback: the callback function called after the new instance is updated

This function updates model with the attributes provided in "data". 
The function first "sanitizes" the provided data


In the models files ( models/users.js etc. ) their are the two functions
"save_sanitize" and "update_sanitize". These two functions directly calls the Helper functions
of the library but with the good parameters directly
For instance, the two frames of the following codes are equivalent to update a User with the provided data

var User   = require("/models").User;
var Helper = require('doitcashit-lib').DICILib.Helper;
var data   = Common.sanitize( User , data );
Common.update_sanitize( User , this.id , data , callback )

var User   = require("/models").User;
var user   = new User();
var data   = Common.sanitize( User , data );
user.update_sanitize( data , callback );
