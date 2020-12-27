#INTRO
This in a Capstone Travel App The Final Project OF Udacity Font-End Course

#API
You will need to sign up in Proxi Api, genoames, and Weatherbit
then
create .env file in the root of the project and write your API keys as following
API_ID=
geonamesAPI=<INSERT YOUR USERNAME IN HERE>
prixauAPI=<INSERT API IN HERE>
weathAPI=<INSERT API IN HERE>

make sure that it dose not include any spaces or semi column

## Getting started
cd into folder and write the following commands in the first terminal window
To install Node modules
'npm i'
To get the dist folder
'npm run build-prod'
To run the server
'npm start' -->
Then write in the second window
To run the client side
'npm run build-dev' 

it will open a window in your browser with the port 8080 then put your origin and destination cities with the dates
The Website will use Your Inserted city to git the Country from geonamesAPI and will get the lng and the lat values from that API to
Then the Proxi Api will get the Destination City to show the image .
Finally the Weather-bit Api Will user the lat lng values to get the Max Low template

There will be chick for user inputs that they are valid and correct ex : if the From date is after the To Date it will alert.
