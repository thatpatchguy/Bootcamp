##Import Dependencies
import os
import csv
import statistics

##Define path to input for easy reference
csv_path = "Resources/election_data.csv"

##Print header of table
print("Election Results")
print('-------------------------------')

with open(csv_path) as csv_file:
    ##Counter for getting the total votes
    i = 0
    csvreader = csv.reader(csv_file,delimiter=",")

    ##Define candidates dictionary to hold each candidate and add one to their votes each time
    candidates = dict()

    ##To prevent errors from reading the header
    next(csvreader)

    ##For each row I check if the candidate voted for is in the dictionary, if it is it adds 1 to their votes
    ##If not, I add them to the dictionary and give them 1 vote
    for row in csvreader:
        if row[2] in candidates:
            candidates[row[2]] = candidates[row[2]] + 1
        else:
            candidates[row[2]] = 1
        ##Increase vote counter
        i = i + 1
    ##Print next part of table
    print(f"Total Votes: {i}")
    print("-------------------------------")

    ##Initialize so we can compare
    most_votes= 0

    ##As it goes through each row of the cadidate dictionary it prints out a line then
    ##  checks it up against the current candidate with most votes, overwriting it if neccesary
    for row in candidates:
        print(f"{row}: {candidates[row]} Votes ({round((candidates[row]/i)*100,2)}%)")
        if candidates[row] > most_votes:
            most_votes = candidates[row]
            winner = row
    ##Print the rest of the table
    print('--------------------------------')
    print(f"Winner: {winner}")
csv_file.close()


##Now do the same but print it to a text file
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