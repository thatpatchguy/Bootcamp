## PyPoll
For this project we were tasked with taking in a simple csv file and counting the votes for each candidate. We had 3 columns (Voter ID, County, and Candidate though for the simplicity of this project we really only looked at one row (What candidate they voted for) If I had the time to go above and beyond and make this a more trustworthy voting system ('tis the season) I would want to ensure each voter id only voted once and break down the results by county.
#### The tasks were as follows:
**Obtain the total amount of votes cast**

This was just a simple counter that increased on each iteration through the csv file (Skipping the header row of course) 

**Candidate list, amount of votes, and percentage**

Originally I looked at the candidates and was creating variables to track each specific candidate but then I realized if I wanted to do this right I want it to work on any dataset, not just for these particular candidates I needed another solution. The obvious, and much easier anyways, solution was to use a dictionary. In each row iteration it checks if the candidates name is already in the dictionary, if it is, it just adds 1 to their vote count, and if not it adds their name to the dictionary and assigns 1 to to the votes (The corresponding dictionary value). Then when outputting this I just iterated through the rows to output the name, their amount of votes, then the percentage using their votes and the total votes.

**The winner of the election**

For this I just used a variable in the same loop as above when outputting the dictionary items to keep track of which candidate had the most votes. Simply checks against the current highest and updates if need be.

Also printed these results to a text file for readability

#### Potential trouble spots
As I stated before this has absolutely no security against people with one voter id voting multiple times, which as we know is a danger to elections. Hopefully there were more tactics on the front end of this polling to prevent that.

I got lucky that with this specific data set and the process in which I created my dictionary made it so they were in descending order when I printed them. In all likelihood this wouldn't happen as easily so I would do something to sort the output from most votes to least.