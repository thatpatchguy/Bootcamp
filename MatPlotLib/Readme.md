# Pymaceuticals

For this project we were tasked with visualizing data through different methods using Matplotlib, a Python library. We received data from multiple data sets and combined them to best analyze them. 

### We were tasked with the following:

* Before beginning the analysis, check the data for any mouse ID with duplicate time points and remove any data associated with that mouse ID.

* Use the cleaned data for the remaining steps.

* Generate a summary statistics table consisting of the mean, median, variance, standard deviation, and SEM of the tumor volume for each drug regimen.

* Generate a bar plot using both Pandas's `DataFrame.plot()` and Matplotlib's `pyplot` that shows  the number of total mice for each treatment regimen throughout the course of the study.

* Generate a pie plot using both Pandas's `DataFrame.plot()` and Matplotlib's `pyplot` that shows the distribution of female or male mice in the study.

* Calculate the final tumor volume of each mouse across four of the most promising treatment regimens: Capomulin, Ramicane, Infubinol, and Ceftamin. Calculate the quartiles and IQR and quantitatively determine if there are any potential outliers across all four treatment regimens.

* Using Matplotlib, generate a box and whisker plot of the final tumor volume for all four treatment regimens and highlight any potential outliers in the plot by changing their color and style.

* Select a mouse that was treated with Capomulin and generate a line plot of tumor volume vs. time point for that mouse.

* Generate a scatter plot of mouse weight versus average tumor volume for the Capomulin treatment regimen.

* Calculate the correlation coefficient and linear regression model between mouse weight and average tumor volume for the Capomulin treatment. Plot the linear regression model on top of the previous scatter plot.

* Look across all previously generated figures and tables and write at least three observations or inferences that can be made from the data. Include these observations at the top of notebook.



## My observations and insights
1. What I find the most interesting is the boxplots showing the final tumor volumes by drug. I think this is one of the most significant and useful visualization of data in this set.
2. On that note, I don't believe this data set to be accurately measuring each drug because it is measuring the final tumor volume with no regard of the size of the original tumor, hence it would be more useful to plot the change in volume throughout dosing of drug. EDIT I decided to just do the plot of the change in volume rather than end volume, ended up realizing the other set was just as helpful as all tumors started at 45 mm3 meaning it was controlled so I didn't need to worry about that variable. With that my boxplot really shows the data but in an inverse way (sometimes its nice to see the top performers at the top)
3. Scatterplots work best with more varying data, the fact that we only had 9 unique weights for the weight makes the scatterplot more difficult to analyze.