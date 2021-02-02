"use strict";

/*

   Author: Nicole Nolan    
   Date:  04/14/21

   Filename:   lht_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

// Set the date displayed in the calendar
let thisDay= new Date();

// Write the calendar data to the element with the id of calendar
document.getElementById("calendar").innerHTML=createCalendar(thisDay);

// Function definition to generate the calendar table
function createCalendar(calDate) {
   let calendarHTML="<table id='calendar_table'>";
   calendarHTML+=calCaption(calDate);
   calendarHTML+=calWeekdayRow();
   calendarHTML+=calDays(calDate);
   calendarHTML+="</table>";
   return calendarHTML;
}

// Function definition to write calendar's caption
function calCaption(calDate) {
   //monthName array contains the list of month names
   let monthName= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   // determine the current month from the calDate value
   let thisMonth= calDate.getMonth();
   // determine the current year from the calDate value
   let thisYear= calDate.getFullYear();
   // build a string for the <caption> element and return that string
   return "<caption>"+monthName[thisMonth]+" "+thisYear+" "+"</caption";
}

// Function to write a table row of weekday abbreviations
function calWeekdayRow() {
   // Array of the weekday abbreviations
   let dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   let rowHTML = "<tr>";

   //Loop through the dayName array building <th> elements for the row
   for(let i=0; i < dayName.length; i++) {
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i]+"</th>";
   } //end of for loop

   rowHTML += "</tr>";
   return rowHTML;
}

// Function to calculate the number of days in the month
function daysInMonth(calDate) {
   //Array of days in each month
   let dayCount= [31,28,31,30,31,30,31,31,30,31,30,31];
   //Extract the four digit year and month value
   let thisYear= calDate.getFullYear();
   let thisMonth= calDate.getMonth();
   //Revise the days in February or leap years
   if(thisYear % 4 === 0) {
      dayCount[1] = 29;
      if((thisYear % 100 !=0) || (thisYear % 400 === 0)) {
         dayCount[1]=29;
      }
   }

   //Return the number of days for the current month
   return dayCount[thisMonth];
}

// Function to write table data for each day of the month
function calDays(calDate) {
   // Determine the starting day of the month
   let day= new Date(calDate.getFullYear(), calDate.getMonth(), 1);
   let weekDay = day.getDay();
   // Write blank cells preceeding the starting day
   let htmlCode = "<tr>";
   for(var i = 0; i < weekDay; i++) {
      htmlCode += "<td></td>";

   }
   // Write the cells for each day of the month
   let totalDays= daysInMonth(calDate);
   let highlightDay = calDate.getDate();
   for( var i = 1; i <= totalDays; i++) {
      day.setDate(i);
      weekDay = day.getDay();

      // Let's see if that weekDay is a Sunday if so, we need a new <tr> element
      if(weekDay === 0) {
         htmlCode += "<tr>";
      }
      
      //Check to see if the counter is up to the highlightDay
      if(i === highlightDay) {
         htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] +"</td>";
      } else {
      // If it's not Sunday, just continue with a <td> element
      htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i]+ "</td>";
      }
      //Before we loop, let's see if we're at Saturday.  If so, we need a closing </tr> tag
      if(weekDay === 6)
         htmlCode += "</tr>";

   }// end of loop

   return htmlCode;
}