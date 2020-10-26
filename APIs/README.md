# Vacation tool
In this project the end goal was essentially to find hotels in desired weather conditions around the world. This was implemented through a two part solution.

### WeatherPy
In this program I find a 2500 random latitude and longitude coordinates across the world and find what the nearest city is to each of those and cancelling out duplicates, so from 2500 values I ended up with 868 cities around the world in my test.
From there I used Open Weather Map API to build a dataframe with all of my desired info retrieved from the API.
With that dataframe I was able to create some plots to observe trends depending on different latitudes.
Finally I outputted the data to use in my hotel finder tool.
#### Some trends I found interesting
1. Of the graphs created, the only ones with any statistical significance are the Maximum temperature vs Latitude graphs since they have R-Values relatively close to 1/-1.
2. I find it interesting that the southern hemisphere only seems to get colder at half the rate moving away from the equator (-.27 vs. -.55) I see two possible reasons for this:
    - The current season leading to sharp declines in temperature in the northern hemisphere
    - There were less cities found in the southern hemisphere and the furthest away from the equator was ~-55 rather than +80 in the north
3. The measure of cloudiness doesn't seem to be as linear of a measurement as it should be theoretically. The clumps of data at 0,20,40,75,90,100 prove to me that there are categorical factors that apply to this measurement.

### VacationPy
Using the data exported from weatherpy I created a heatmap of the the cities in the dataframe measured by the humidity (helpful for me to know where not to live)

Then below there I created a new dataframe that only includes cities that fit specific criteria. For this test I used (80 < max temp < 90), (Wind speed < 10) and (Cloudiness == 0)
I then recieved a list of 12 cities from my original 821 that fit my conditions.

Then using those cities and google places API I was able to add pins to my heatmap with a hotel in each city that fits my conditions.

See heatmap for example.