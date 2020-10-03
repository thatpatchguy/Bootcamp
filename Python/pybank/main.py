##Import my dependencies
import os
import csv
import statistics

##Create path to find data
csv_path = "Resources/budget_data.csv"

print('Financial Analysis')
print('-----------------------------')
with open(csv_path) as csvfile:
    i = 0
    csvreader = csv.reader(csvfile, delimiter=",")
    net_gain = 0
    dateArray = []
    profitArray = []
    biggestGain = 0
    biggestLoss = 0
    next(csvreader)
    for row in csvreader:
        i = i + 1
        dateArray.append(row[0])
        profitArray.append(int(row[1]))
        if int(row[1]) > int(profitArray[biggestGain]):
            biggestGain = i - 1
        if int(row[1]) < int(profitArray[biggestLoss]):
            biggestLoss = i - 1



    
    print(f"Total Months on Record: {len(profitArray)}")
    print(f"Net profit/losses over period: {sum(profitArray)}")
    print(f"Average change: {round(statistics.mean(profitArray),2)}")
    print(f"Largest gain over period: {profitArray[biggestGain]} ({dateArray[biggestGain]})")
    print(f"Largest loss over period: {profitArray[biggestLoss]} ({dateArray[biggestLoss]})")
