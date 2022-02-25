# Nolan Daly Project 1: Bad Air

## Project Overview

This application serves to demonstrate changes in the United States's air quality over the past several decades. To accomplish this, several aspects of air quality (major pollutants, safety rating) have been catalogued for a variety of U.S. regions (typically counties) annually from 1980 to 2021, with the ability to directly compare any two of such regions in the United States. The goal of this is to provide a region-by-region analysis of air quality changes and enable the comparison of regions against one another on a variety of air quality properties.

## Data

The data used for this project was collected by the EPA and obtained from [their official website](https://aqs.epa.gov/aqsweb/airdata/download_files.html#Annual). After downloading the data on a year-by-year basis, the files were combined into one complete copy, which is presently utilized in the application. It contains a combination of identifying information (years, states/main regions, subregions/counties) and the corresponding region/timeframe's air quality information (safety ratings, AQI measurements, and major pollutants recorded per day). The data is partially incomplete, with some years and major areas of data being missing for certain regions, though a separate entry does track how many days were not recorded for AQI for each region/timeframe combination.

## Visualization

The data for each region is displayed across a total of ten figures in this application, with five distinct figures being used for each of the two regions. These figures are split in half vertically, allowing for a relatively easy comparison of different regions. At the top of each half, there are selection boxes that allow the user to pick a main/sub region for each of the two sections. The topmost figure for each region is used to display AQI-related measurements over the 1980-2021 period, such as max AQI or median AQI. These different measurements can be swapped using a dropdown menu in the top left of the display. Below these AQI measurements, a second figure is used to display changes in common daily pollutants across the timeframe, visualized in a stacked bar chart. Each pollutant is represented by a separate color, and specific information for each can be obtained by hovering over certain blocks in each year's bar. Below this, an additional figure is used to track which days in each year had no recorded AQI
