##Import Dependencies
import os
import csv
import statistics

csv_path = "Resources/election_data.csv"

print("Election Results")
print('-------------------------------')

with open(csv_path) as csv_file:
    i = 0
    csvreader = csv.reader(csv_file,delimiter=",")

    candidates = dict()

    next(csvreader)
    for row in csvreader:
        if row[2] in candidates:
            candidates[row[2]] = candidates[row[2]] + 1
        else:
            candidates[row[2]] = 1
        i = i + 1
    print(f"Total Votes: {i}")
    print("-------------------------------")
    most_votes= 0
    for row in candidates:
        print(f"{row}: {candidates[row]} Votes ({round((candidates[row]/i)*100,2)}%)")
        if candidates[row] > most_votes:
            most_votes = candidates[row]
            winner = row
    print('--------------------------------')
    print(f"Winner: {winner}")
csv_file.close()

output_path = "Resources/output.txt"
with open(output_path, 'w') as txtfile:
    txtfile.write("Election Results\n")
    txtfile.write('-------------------------------\n')
    txtfile.write(f"Total Votes: {i}\n")
    txtfile.write('-------------------------------\n')
    for row in candidates:
        txtfile.write(f"{row}: {candidates[row]} Votes ({round((candidates[row]/i)*100,2)}%)\n")
    txtfile.write('-------------------------------\n')
    txtfile.write(f"Winner: {winner}")
txtfile.close()