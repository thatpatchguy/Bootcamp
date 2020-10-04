# Python Projects
For this unit we had two different datasets that we needed to be analyzed in different ways. One of a very simple banking service and one of a small towns very simple polling platform. The challenges were different enough to stay interesting but imilar enough for me to really drill down the core concepts into my head.
## PyBank
For this project we were given a large CSV file with only two columns, the *Date* and the *Profit(+/-)* and we were tasked with creating a financial analysis of whatever period is given in the file.
#### The tasks were as follows:
- The total number of months included in the dataset
This was easy enough as I just needed to implement a counter that increased with each row and print it at the end.
- The net total of profit/losses over the period
For this I ended up just creating an array for each cell in the profit column and got the Sum of the array
-Average change over the period
This was also easy in theory to just run the mean of the array, I did import the statistics package to help me do this easier and more readable. 
- Largest gain over period and Largest loss over period
For these I just created if statements so as it goes through each row it compares the profit against the current largest gain and loss and updates accordingly if it is larger of a loss or gain. I decided to just store the *i* counter in the variables of biggest loss and gain so that I can reference them easier without needing to store both the date and profit in seperate variables each time it updates. Yay for multi use counters and efficiency!

We also were tasked with outputting the data to an output file rather than just the terminal which was easy enough. I originally had it as a csv file in the output as that is what we learned but changed it to a text file for readability.

#### Potential trouble spots
In the case that there are only Gains (positive numbers) or only losses (negative numbers) in the data set the biggest loss or biggest gain variable would never update so it will print the first values at the 0 index. I decided to keep the defining them as zero so that the program wouldn't crash but this also is not a perfect form of error-catching

## PyPoll
For this project we were tasked with taking in a simple csv file and counting the votes for each candidate. We had 3 columns (Voter ID, County, and Candidate though for the simplicity of this project we really only looked at one row (What candidate they voted for) If I had the time to go above and beyond and make this a more trustworthy voting system ('tis the season) I would want to ensure each voter id only voted once and break down the results by county.
#### The tasks were as follows:
- Obtain the total amount of votes cast
This was just a simple counter that increased on each iteration through the csv file (Skipping the header row of course)
- Candidate list, amount of votes, and percentage
Originally I looked at the candidates and was creating variables to track each specific candidate but then I realized if I wanted to do this right I want it to work on any dataset, not just for these particular candidates I needed another solution. The obvious, and much easier anyways, solution was to use a dictionary. In each row iteration it checks if the candidates name is already in the dictionary, if it is, it just adds 1 to their vote count, and if not it adds their name to the dictionary and assigns 1 to to the votes (The corresponding dictionary value). Then when outputting this I just iterated through the rows to output the name, their amount of votes, then the percentage using their votes and the total votes.
- The winner of the election
For this I just used a variable in the same loop as above when outputting the dictionary items to keep track of which candidate had the most votes. Simply checks against the current highest and updates if need be.

Also printed these results to a text file for readability

#### Potential trouble spots
As I stated before this has absolutely no security against people with one voter id voting multiple times, which as we know is a danger to elections. Hopefully there were more tactics on the front end of this polling to prevent that.

I got lucky that with this specific data set and the process in which I created my dictionary made it so they were in descending order when I printed them. In all likelihood this wouldn't happen as easily so I would do something to sort the output from most votes to least.