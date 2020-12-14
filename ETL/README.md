# Extract, Transform, and Load (ETL) Project

## Project Context
This was a relatively simple project with a lot of room for flexibility which gave me the opportunity to do something more personal to me. Now for 3 years of my life I had the opportunity to work with a non-profit called Up with People. We were a lively group of young people who would normally travel for 6 months together as a 'Cast'. As this 'Cast' would travel to a new community each week we would stay with host families, do volunteer work, perform a professional musical show, and experience the culture wherever we went. I personally travelled with this non-profit as a participant for a gap-year between high school and college then after graduation got a job on the road staff travelling each week with the cast.

## Problem
These experiences were absolutely timeless and we were experiencing so much each day it was difficult to keep all the memories straight in your head even after 1 semester, much less after 6 different tours for me, or other staff members I know did up to 20 tours. It's not uncommon for me to forget which countries and cities I went to each year or even the name of an obscure German town I went to years ago and since I am generally bad at documenting my travels I wanted to create a tool to help myself and other ex-staff members kickstart our memory to help uncover forgotten memories.

## Planning

### Data
For data I essentially needed to find two different things, the tour schedule going back as far as I could find, and the locational data for each of those.

#### Tour Schedule Data:
Unfortunately, the only place to retrieve the tour schedule is on a webpage which seems to have been typed in very manually and only goes back to 2007 (The organization has been around since 1965) but I figured I could make do with what I had, I was able to copy and paste the text from the webpage into excel and with some sneaky find and replaces and other tricks got it formatted in a suitable way. At this point each line in the CSV is just the Tour semester (ex. 'Spring 2007') and the city we went to (ex. 'Wartenburg, Germany'). I did realize partially through that I could use web scraping for it but decided it would lead to less efficiency in the end. 

#### Geolocational Data:
My second data source is actually using the google geocode API to get the coordinates for each city we went to. Simple enough as once I cleaned up the data to look nice in my tour schedule set it was easy to send the request to google.

### Transform
A couple transformations took place, first and the most tedious was really just spell checking and consistency checking the data pulled from the Up with People website. Many cities were spelled wrong, cities were placed in incorrect countries, and some left off entirely. 

Next I needed to transform the tour stop strings into seperate city, state, and country. This proved slightly difficult as only the U.S. tour stops had states but it was right in the middle of the other two. But in the end it wasn't too bad with a simple split.

The final transformation was fixing the tour name to something more familiar which was Cast. Since 2007 (Which is the data I have anyways) Up with people has sent an 'A' Cast in the spring of each year and a 'B' Cast in the fall of each year. It is simply an identifier for the tour but it becomes a sense of pride in your cast compared to other casts, so people would much rather search by cast name 'B13' rather than tour 'Fall 2013'. (I travelled in B13, A14, B18, A19, B19, and A20)


### Load
Finally I just had to load the data into a database. I chose to use NoSql in MongoDB due to it's simplicity and lack of any need to join with other tables.

### Bonus
In the find_tour file I take user input to find the tour stops of the tour entered which is really the whole point of my project in the end.