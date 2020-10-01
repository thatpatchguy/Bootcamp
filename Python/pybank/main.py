##Import my dependencies
import os
import csv

##Create path to find data
csv_path = "Resources/budget_data.csv"

print('Financial Analysis')
print('-----------------------------')
with open(csv_path) as csvfile:
    totalMonths = sum(1 for line in csvfile)
    print(f"Total Months on Record: {totalMonths}")
    csvreader = csv.reader(csvfile, delimiter=",")
    net_gain = 0
    for row in csvreader:
        net_gain = net_gain + row[1]
    print(net_gain)
