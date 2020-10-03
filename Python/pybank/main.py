##Import my dependencies
import os
import csv
import statistics

##Create path to find data
csv_path = "Resources/budget_data.csv"

##Create header for Financial Analysis
print('Financial Analysis')
print('-----------------------------')


with open(csv_path) as csvfile:
    ##This i is double purpose to store the array location the biggest gain and loss were and to count up all the months
    i = 0
    csvreader = csv.reader(csvfile, delimiter=",")
    
    ##Create arrays to store mirroring value of each column
    dateArray = []
    profitArray = []

    ##Set up variables that will change when they find a bigger gain or loss
    biggestGain = 0
    biggestLoss = 0

    ##Skip the first row containing column names
    next(csvreader)
    
    for row in csvreader:
        ##Add the date and profit in integer form to their corresponding arrays
        dateArray.append(row[0])
        profitArray.append(int(row[1]))
        ##Compares profit of this row to the current largest gain or loss and updates if needed
        if int(row[1]) > int(profitArray[biggestGain]):
            biggestGain = i
        if int(row[1]) < int(profitArray[biggestLoss]):
            biggestLoss = i
        ##Increase counter     
        i = i + 1



    ##Prints out the financial analysis
    print(f"Total Months on Record: {i}")
    print(f"Net profit/losses over period: {sum(profitArray)}")
    print(f"Average change: {round(statistics.mean(profitArray),2)}")
    print(f"Largest gain over period: {profitArray[biggestGain]} ({dateArray[biggestGain]})")
    print(f"Largest loss over period: {profitArray[biggestLoss]} ({dateArray[biggestLoss]})")
