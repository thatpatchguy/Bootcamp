#Python Projects
For this unit we had two different datasets that we needed to be analyzed in different ways. One of a very simple banking service and one of a small towns very simple polling platform. The challenges were different enough to stay interesting but imilar enough for me to really drill down the core concepts into my head.
##Pybank
For this project we were given a large CSV file with only two columns, the *Date* and the *Profit(+/-)* and we were tasked with creating a financial analysis of whatever period is given in the file.
###The tasks were as follows:
-The total number of months included in the dataset
This was easy enough as I just needed to implement a counter that increased with each row and print it at the end.
-The net total of profit/losses over the period
For this I ended up just creating an array for each cell in the profit column and got the Sum of the array
-Average change over the period
This was also easy in theory to just run the mean of the array, I did import the statistics package to help me do this easier and more readable. 
-Largest gain over period and Largest loss over period
For these I just created if statements so as it goes through each row it compares the profit against the current largest gain and loss and updates accordingly if it is larger of a loss or gain. I decided to just store the *i* counter in the variables of biggest loss and gain so that I can reference them easier without needing to store both the date and profit in seperate variables each time it updates. Yay for multi use counters and efficiency!

###Potential trouble spots
In the case that there are only Gains (positive numbers) or only losses (negative numbers) in the data set the biggest loss or biggest gain variable would never update so it will print the first values at the 0 index. I decided to keep the defining them as zero so that the program wouldn't crash but this also is not a perfect form of error-catching