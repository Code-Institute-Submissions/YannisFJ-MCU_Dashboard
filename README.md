# Interactive Marvel Data Dashboard 

**Milestone Project 2**
This project is an interactive dashboard I have created for users to compare/contrast data from various 'Marvel Cinematic Universe' films. The data ranges from budgets, opening weekend gross, cinemas released in, release dates, worldwide gross and allows users to ascertain some interesting correlations! 
Due to the dashboard's interactive nature, the project fulfils the desire of true Marvel fans to personally identify interesting trends and stats. I have provided two select-menus for users to isolate data from franchises and/or individual movies. 
Users can reset by putting the menu to 'select all'.
 

## Demo

A live demo can be found here: https://yannisfj.github.io/MCU_Dashboard/


## Existing Features

•	**Dynamic Graphs** – When one aspect of a graph is selected, the others change accordingly. For example, in the picture below, a time frame was selected and the pie chart below it changed to show movies from only that time frame

• **Select Menus** – The two select menus allow a user to cherry pick the data of a specific movie or franchise. For example, below we have selected the 'Captain America' franchise, and can now have a selection of any 3 Captain America movies (if we wish to delve deeper into the movie data).

 


•	**Hover** – When hovering over a particular movie, the dashboard will tell the user in plain English what it represents:
 


## Technologies Used

-	**DC, D3, Crossfilter and Queue** – used to create the interactive graphs and process data from the JSON file.

-	**JavaScript** - used to bring the graphs to life by adding dimensions, groups, colors, titles and much more.

-	**HTML5** – used to write my site: https://www.w3.org/html/

-	**CSS** – used to customise my site and make it responsive: https://www.w3.org/Style/CSS/

-	 **Bootstrap (3.3.7)** – used for great features and modern look. Carousel, thumbnails, scrollSpy and modals were made possible: https://getbootstrap.com/docs/3.3/css/

-	**JSON validator** - https://jsonlint.com/


## Deployment

The dashboard is hosted on GitHub pages, deployed from the master branch. As such, it will automatically update if there are new commits to the aformentioned branch.  If you want to run the site locally, you can clone this repository by pasting git clone     into your terminal.

## Features Left to Implement

This project only contained Marvel movies that were part of a franchise, therefore excluding stand-alone movies like 'Black Panther' and 'Doctor Strange'. In the future, I will implement the data from these standalone movies to provide users with an even more comprehensive dashboard of the Marvel universe.

# Bugs:

Through testing, I discovered a few problems that were all ultimately fixed, these included:

-	Graphs not showing up due to my JSON data being invalid (due to a misplaced semi colon)
-	Graph not showing up on Github Pages due to using an absolute filepath when connecting to my graph.js file.
-	Graph text overlapping on my stacked chart (solution was to put the text at an angle)
-	Changing text colour on pie charts and giving it a shadow, so it would be visible against the dashboard background (this took longer than I'd like to admit)

### Acknowledgements

-	My tutor Guido 
-	Tutors at code institute who helped me identify why my graphs weren't displaying
