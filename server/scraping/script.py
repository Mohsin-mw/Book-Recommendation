import pandas as pd
from bs4 import BeautifulSoup
import requests
import time
import random

HEADERS = ...
WEB_URL = "..."
BASE_URL = "..."

data_list = []
books = []
limit_reached = False
for i in range(1, 6):
    if limit_reached:
        break  # Exit the loop if the limit is reached
    URL = f"https://www.goodreads.com/list/show/546.Foreign_Lands?page={i}"
    print(URL)
    PRODUCT_PAGE_URL = "https://www.goodreads.com"
    webpage = requests.get(URL, headers=HEADERS)
    soup = BeautifulSoup(webpage.content, "html.parser")
    links = soup.find_all("a", attrs={'class': 'bookTitle', 'itemprop': 'url'})
    for link in links:
        try:
            product_page = PRODUCT_PAGE_URL + link.get('href')
            product_webpage = requests.get(product_page, headers=HEADERS)
            new_soup = BeautifulSoup(product_webpage.content, "html.parser")
            # PRODUCT IMAGE
            image_container = new_soup.find('div', attrs={'class': 'BookCover__image'})
            image = image_container.find('img', attrs={'class': 'ResponsiveImage'}).get('src')
            # TITLE
            title_container = new_soup.find('div', attrs={'class': 'BookPageTitleSection__title'})
            title = title_container.find('h1', attrs={'class': 'Text Text__title1'}).text.strip()
            # AUTHOR
            author = new_soup.find('span', attrs={'class': 'ContributorLink__name'}).text.strip()
            # RATING
            rating = new_soup.find('div', attrs={'class': 'RatingStatistics__rating'}).text.strip()
            # DESCRIPTION
            description_container = new_soup.find('div',
                                                  attrs={'class': 'DetailsLayoutRightParagraph__widthConstrained'})
            description = description_container.find('span', attrs={'class': 'Formatted'}).text.strip()

            # Find the <ul> element containing the genres list
            genres_ul = new_soup.find("ul",
                                      attrs={'class': 'CollapsableList', 'aria-label': 'Top genres for this book'})
            # Initialize a list to store the genre names
            genres = []

            # Iterate over the <a> elements within the <ul> element
            for genre_a in genres_ul.find_all("a"):
                # Extract the genre name from the text of the <span> element within the <a> element
                genre_name = genre_a.find("span", class_="Button__labelItem").text.strip()
                # Append the genre name to the list of genres
                genres.append(genre_name)

            data_list.append(
                {'Image': image, 'Title': title, 'Author': author, 'Rating': rating, 'Description': description,
                 'Genres': genres})

            sleep_duration = random.randint(1, 3)
            print(f"Sleeping for {sleep_duration} seconds...")
            time.sleep(sleep_duration)
            if len(data_list) >= 399:
                limit_reached = True
                break;
            print(len(data_list), f"Title: {title}, Genre: {genres}")
        except Exception as e:
            print(e)

data_df = pd.DataFrame(data_list)
try:
    existing_data = pd.read_csv('algorithm/book_data.csv')
except FileNotFoundError:
    existing_data = pd.DataFrame()
except pd.errors.EmptyDataError:
    existing_data = pd.DataFrame()

if not existing_data.empty:
    data_list = pd.concat([existing_data, pd.DataFrame(data_list)], ignore_index=True)

data_df.to_csv('algorithm/book_data.csv', mode='a', header=not existing_data.empty, index=False)