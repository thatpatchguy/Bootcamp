Attribute VB_Name = "Module1"
Sub tickerChecker():
    Dim tickerSymbol As String
    Dim combinedRow As Integer
    Dim firstOpen As Double
    Dim lastClose As Double
    Dim totalVolume As Double
    Dim greatestPercent As Double
    Dim leastPercent As Double
    Dim greatestVolume As Double
    Dim greatestPercentT As String
    Dim leastPercentT As String
    Dim greatestVolumeT As String
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
    
    For i = 2 To lastRow
    
        'My code fills most things once it recognizes a change
        If tickerSymbol <> Cells(i, 1).Value Then
            'Fills out ticker Symbol
            Cells(combinedRow, 9).Value = tickerSymbol
            'Assign last close to row above its Close column
            lastClose = Cells(i - 1, 6).Value
            Cells(combinedRow, 10).Value = lastClose - firstOpen
            Cells(combinedRow, 11).Value = (lastClose / firstOpen) - 1
            Cells(combinedRow, 12).Value = totalVolume
            
            
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
            
            combinedRow = combinedRow + 1
            Cells(combinedRow, 9).Value = Cells(i, 1).Value
            
            'Resets variables for new symbol
            firstOpen = Cells(i, 3).Value
            If firstOpen = 0 Then firstOpen = 0.000001
            tickerSymbol = Cells(i, 1).Value
            totalVolume = Cells(i, 7).Value
        Else
            totalVolume = totalVolume + Cells(i, 7).Value
        End If
    Next i
    lastRow2 = Cells(Rows.Count, "K").End(xlUp).Row
    For i = 2 To lastRow2
        If Cells(i, 11).Value > 0 Then
            Cells(i, 11).Interior.Color = RGB(0, 200, 0)
        Else
            Cells(i, 11).Interior.Color = RGB(200, 0, 0)
        End If
        Cells(i, 11).NumberFormat = "0.00%"
    Next i
    
    Cells(2, 16) = greatestPercentT
    Cells(3, 16) = leastPercentT
    Cells(4, 16) = greatestVolumeT
    Cells(2, 17) = greatestPercent - 1
    Cells(3, 17) = leastPercent - 1
    Cells(4, 17) = greatestVolume
    Cells(2, 17).NumberFormat = "0.00%"
    Cells(3, 17).NumberFormat = "0.00%"
End Sub

Sub wsLoop():
    Dim ws As Worksheet
    Dim starting_ws As Worksheet
    Set starting_ws = ActiveSheet
    
    For Each ws In ThisWorkbook.Worksheets
        ws.Activate
        With ws
            Call tickerChecker
        End With
    Next
    
    starting_ws.Activate
End Sub

