# VBA Stock Data Homework
For this project I was tasked with looping through raw stock data to summarize each ticker symbols performance based on specific metrics. It also will create a table summarizing the best and worst in specific metrics.

Code is as follows:
```
Sub tickerChecker():
    'Creating variables
    Dim tickerSymbol As String
    Dim combinedRow As Integer
    Dim firstOpen As Double
    Dim lastClose As Double
    Dim totalVolume As Double
    
    'These are to track the standings metrics
    Dim greatestPercent As Double
    Dim leastPercent As Double
    Dim greatestVolume As Double
    Dim greatestPercentT As String
    Dim leastPercentT As String
    Dim greatestVolumeT As String
    
    'Making the summary table start after the headers
    combinedRow = 2
    lastRow = Cells(Rows.Count, "A").End(xlUp).Row + 1
    
    'Prepare Table
    Cells(1, 9).Value = "Ticker Symbol"
    Cells(1, 10).Value = "Yearly Change"
    Cells(1, 11).Value = "% Change"
    Cells(1, 12).Value = "Total Volume"
    Cells(1, 16) = "Ticker"
    Cells(1, 17) = "Value"
    Cells(2, 15) = "Greatest % Increase"
    Cells(3, 15) = "Greatest % Decrease"
    Cells(4, 15) = "Greatest Total Volume"
    Range("A1:Q1").Font.Bold = True
    Range("O2:O4").Font.Bold = True
    Columns("A:O").AutoFit
    
    'Prepare variables for For loop since it only reassigns when it recognizes a change
    tickerSymbol = Cells(2, 1).Value
    firstOpen = Cells(2, 3).Value
    
    'Loops through the raw data table one row at a time
    For i = 2 To lastRow
    
        'My code fills most things once it recognizes a change
        If tickerSymbol <> Cells(i, 1).Value Then
            'Fills out ticker Symbol
            Cells(combinedRow, 9).Value = tickerSymbol
            'Assign last close to row above its Close column
            lastClose = Cells(i - 1, 6).Value
            
            'Fill out metrics for the previous symbol
            Cells(combinedRow, 10).Value = lastClose - firstOpen
            Cells(combinedRow, 11).Value = (lastClose / firstOpen) - 1
            Cells(combinedRow, 12).Value = totalVolume
            
            'Here we check if it is higher or lower than any of the current Greatest metrics
            If (lastClose / firstOpen) > greatestPercent Then
                greatestPercent = (lastClose / firstOpen)
                greatestPercentT = tickerSymbol
            End If
            If (lastClose / firstOpen) - 1 < leastPercent Then
                leastPercent = (lastClose / firstOpen)
                leastPercentT = tickerSymbol
            End If
            If totalVolume > greatestVolume Then
                greatestVolume = totalVolume
                greatestVolumeT = tickerSymbol
            End If
            
            'Bump down to the next row to get ready for next symbol
            combinedRow = combinedRow + 1
            Cells(combinedRow, 9).Value = Cells(i, 1).Value
            
            'Resets variables for new symbol
            firstOpen = Cells(i, 3).Value
            If firstOpen = 0 Then firstOpen = 0.000001
            tickerSymbol = Cells(i, 1).Value
            totalVolume = Cells(i, 7).Value
        Else
            'All other cases between when they change we just care about the volume
            totalVolume = totalVolume + Cells(i, 7).Value
        End If
    Next i
    
    'Finds the last row of the summary table
    lastRow2 = Cells(Rows.Count, "K").End(xlUp).Row
    'Changes color formatting based on metric
    For i = 2 To lastRow2
        If Cells(i, 11).Value > 0 Then
            Cells(i, 11).Interior.Color = RGB(0, 200, 0)
        Else
            Cells(i, 11).Interior.Color = RGB(200, 0, 0)
        End If
        'To display the number as a percent
        Cells(i, 11).NumberFormat = "0.00%"
    Next i
    
    'Fill out the metric standings table
    Cells(2, 16) = greatestPercentT
    Cells(3, 16) = leastPercentT
    Cells(4, 16) = greatestVolumeT
    Cells(2, 17) = greatestPercent - 1
    Cells(3, 17) = leastPercent - 1
    Cells(4, 17) = greatestVolume
    'Make sure they are displayed as percentage
    Cells(2, 17).NumberFormat = "0.00%"
    Cells(3, 17).NumberFormat = "0.00%"
End Sub
```

I then used the following to do that on each page in the workbook:
```

Sub wsLoop():
    'Sets worksheet as a variable and
    Dim ws As Worksheet
    
    'Steps through each worksheet in the workbook to call the tickerChecker function on it
    For Each ws In ThisWorkbook.Worksheets
        ws.Activate
        With ws
            Call tickerChecker
        End With
    Next
End Sub

```

### Potential Trouble Spots
1. I used a workaround to avoid dividing by 0 if the firstOpen was ever 0. Right now I assigned firstOpen to .0001 if it was 0 to avoid that. I did this to clean up my code since originally I had 3 different spots I was using if..else.. statements to make sure it wasn't 0 before going into another statement. I feel there should be a better workaround to avoid dividing by zero but I couldn't find it.

2. I used variables that potentially changed every loop for the bonus standings table rather than scanning my summary table at the end. I was trying to use VLOOKUP or a similar VBA function to get the metrics from that table but couldn't get it to behave how I wanted so went for a more brute force method. I think with larger amounts of data it would be important to do this post-processing rather than adding comparisons in each loop. 

3. If data is not sorted by Ticker Symbol and date this solution is useless.