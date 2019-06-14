# Interactive Marvel Data Dashboard 

**Milestone Project 2**

This project is an interactive dashboard I have created for users to compare/contrast data from various 'Marvel Cinematic Universe' films. The data ranges from budgets, opening weekend gross, cinemas released in, release dates, worldwide gross and allows users to ascertain some interesting correlations! 

Due to the dashboard's interactive nature, the project fulfils the desire of true Marvel fans to personally identify interesting trends and stats. I have provided two select-menus for users to isolate data from franchises and/or individual movies. 

## Demo

A live demo can be found here: https://yannisfj.github.io/MCU_Dashboard/

<img width="1230" alt="Screenshot 2019-06-13 at 15 21 58" src="https://user-images.githubusercontent.com/44097978/59495002-51c2e600-8e86-11e9-985f-f29eb72b83a2.png">

## UX Design

I wanted the UI to provide a simple, cheerful and fluid experience for users. 

The final layout satisfied the desire for simplicity, as the 'select menus' are clearly signposted for users, allowing them to filter the data at will. Furthermore, its intuitive nature means that users will know how to reset the button (simply by going back to 'select all', which is the default selection). Furthermore, even if a user chooses not to use these buttons, when they click on the graphs, the other graphs will change accordingly, showing the user the interactivity. This is also explained in a very brief paragraph at the top of the page.

The colour schemes I selected (multi-coloured graphs, white background, 'Tomato' coloured header with white text) work well together and took some trial and error to get right. I played around with various text colours and decided that ultimately this was the best one. Furthermore, the font I chose was very eye catching!

Below is a comparison of a stacked chart graph, before and after implementing my UX design, including font choice, boldness, angle of the graph text, labels of the graph and 'titles' when hovering over the bars.

**After:**
<img width="1232" alt="Screenshot 2019-06-13 at 14 47 55" src="https://user-images.githubusercontent.com/44097978/59495132-95b5eb00-8e86-11e9-9c1d-8c10f2ab43ca.png"> 

**Before:** 

<img width="803" alt="Screenshot 2019-06-11 at 01 22 34" src="https://user-images.githubusercontent.com/44097978/59495137-98b0db80-8e86-11e9-8a39-a591a921f1bf.png">  


**The dashboard is for a certain type of user:**

1. **People looking to identify movie trends** can easily use this dashboard for research, as it contains a multitude of easily comparable data. They are concerned with quickly identifying the data for all the different movies/franchises, something which the select menus easily allow. Furthermore, they are placed relatively close to the left side of the screen, as that is where the users eye is normally first drawn. In addition, I included an eye-catching paragraph that **gives examples** of potential data comparison ideas. People curious about how the MCU has grown to where it is today would have no trouble identifying the movies that propelled it, and the franchises that have the most investment.

Some user stories:

•	I want to effortlessly identify which franchise had the highest gross in a specified time period

•	I want to see how movie budget correlates with movie worldwide income

•	I want to know how the amount of cinema screenings correlates with the opening weekend gross

•	As a fan, I want to know how my favourite MCU franchise compares to others on all metrics

## Technologies Used

-	**DC, D3, Crossfilter and Queue** – used to create the interactive graphs and process data from the JSON file.

-	**JavaScript** - used to bring the graphs to life by adding dimensions, groups, colors, titles and much more.

-	**HTML5** – used to write my site: https://www.w3.org/html/

-	**CSS** – used to customise my site and make it responsive: https://www.w3.org/Style/CSS/

-	 **Bootstrap (3.3.7)** – used for great features and modern look. Carousel, thumbnails, scrollSpy and modals were made possible: https://getbootstrap.com/docs/3.3/css/

-	**JSON validator** - https://jsonlint.com/

## Existing Features

•	**Dynamic Graphs** – When one aspect of a graph is selected, the others change accordingly. For example, in the picture below, a time frame was selected and the pie chart below it changed to show movies from only that time frame

<img width="514" alt="Screenshot 2019-06-13 at 14 48 31" src="https://user-images.githubusercontent.com/44097978/59495009-55ef0380-8e86-11e9-9fa1-8c95b106dae1.png">

• **Select Menus** – The two select menus allow a user to cherry pick the data of a specific movie or franchise. For example, below we have selected the 'Captain America' franchise, and can now have a selection of any 3 Captain America movies (if we wish to delve deeper into the movie data).

<img width="1033" alt="Screenshot 2019-06-13 at 23 24 37" src="https://user-images.githubusercontent.com/44097978/59495055-70c17800-8e86-11e9-902a-4d9e2e9c5136.png">
 
•	**Hover** – When hovering over a particular data point, the dashboard will tell the user in plain English what it represents:

<img width="890" alt="Screenshot 2019-06-13 at 13 00 22" src="https://user-images.githubusercontent.com/44097978/59541615-1f3ddb00-8ed0-11e9-8c52-0a3fe18a2a8d.png">

## Features Left to Implement

This project only contained Marvel movies that were part of a franchise, therefore excluding stand-alone movies like 'Black Panther' and 'Doctor Strange'. In the future, I will implement the data from these standalone movies to provide users with an even more comprehensive dashboard of the Marvel universe.

## Testing

The testing process was thorough, in order to ensure:

-	The charts worked interactively and **correct**
-	The data itself was accurate
-	The graphs showed up 

To test the accuracy of the data, I used an online JSON validator https://jsonlint.com/). This allowed me to identify errors in my movie data, which I had manually collected and put together myself. I had initially put the data in between a <script> tag in my HTML document, but towards the end of the project I realised I needed to transfer it to a JS file for good practice. The graphs completely disappeared (for more than one reason) but I was able to fix it, partly due to testing the validity of the JSON file.

Checking the charts worked interactively was quite simple, as I simply pretended I was a user and manually clicked the charts every time I added a new one. This allowed me to see first-hand how the graphs reacted to one another. It also allowed me to test if the select-menus were working accurately.

I also utilised automated testing via the Jasmine testing framework. This was to see if my JavaScript function would render the values I wanted. This lead to the realisation that my stacked chart was displaying the wrong stacked data – which I subsequently fixed.

## Deployment

The dashboard is hosted on GitHub pages, deployed from the master branch. As such, it will automatically update if there are new commits to the aformentioned branch.  If you want to run the site locally, you can clone this repository.

## Bugs:

Through testing, I discovered a few problems that were all ultimately fixed, these included:

-	Graphs not showing up due to my JSON data being invalid (due to a misplaced semi colon)
-	Graph not showing up on Github Pages due to using an absolute filepath when connecting to my graph.js file.
-	Graph text overlapping on my stacked chart (solution was to put the text at an angle)
-	Changing text colour on pie charts and giving it a shadow, so it would be visible against the dashboard background (this took longer than I'd like to admit)

### Acknowledgements

-	My tutor Guido 
-	Tutors at code institute who helped me identify why my graphs weren't displaying
