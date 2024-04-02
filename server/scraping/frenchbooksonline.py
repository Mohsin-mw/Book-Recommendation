import pandas as pd
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
import time
import random
import os

# https://www.lireka.com/fr/pc/livre-developpement-personnel?page=3

# User-Agent header
HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0'}

# WebDriver options
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

BASE_URL = 'https://www.lireka.com'
WEB_URL = 'https://www.lireka.com/fr/pc/livre-developpement-personnel?page='

csv_file = 'scraped_data.csv'
csv_file_exists = os.path.exists(csv_file)

for i in range(3, 10):
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    # Load the starting page
    driver.get(f"{WEB_URL}{i}")

    # Wait for some time to let the page load (random wait time)
    time.sleep(random.uniform(3, 5))



    try:
        accept_button = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.ID, 'didomi-notice-agree-button')))
        accept_button.click()
        WebDriverWait(driver, 10).until(EC.invisibility_of_element_located((By.ID, 'didomi-notice-agree-button')))
    except TimeoutException:
        print("Accept button not found or timed out")
    time.sleep(5)
    page_source = driver.page_source

    driver.quit()

    # Parse the page source with BeautifulSoup
    soup = BeautifulSoup(page_source, 'html.parser')
    links = soup.find_all('a', attrs={
        'class': 'book-card d-block position-relative pt-3 pb-2 px-md-2 mx-2 mx-sm-auto rounded custom-link h-100 position-relative d-flex flex-column'})

    times = 0

    if links:

        for i in links:
            try:
                options = webdriver.ChromeOptions()
                driver = webdriver.Chrome(options=options)
                # Construct the URL for the first product page
                product_page = BASE_URL + i.get('href')
                print("Scraping product page:", product_page)
                time.sleep(3)
                driver.get(product_page)
                try:
                    # Wait for accept button and click it
                    accept_button = WebDriverWait(driver, 5).until(
                        EC.element_to_be_clickable((By.ID, 'didomi-notice-agree-button')))
                    accept_button.click()
                    # Wait for the page to load after accepting
                    WebDriverWait(driver, 10).until(
                        EC.invisibility_of_element_located((By.ID, 'didomi-notice-agree-button')))
                except TimeoutException:
                    driver.quit()
                    print("Accept button not found or timed out")
                time.sleep(7)
                page_source = driver.page_source
                driver.quit()
                new_soup = BeautifulSoup(page_source, "html.parser")
                title = new_soup.find('h1', attrs={'class': 'mb-0 fw-semibold fs-h3 fsgrid-sm-h2'})

                app_show_more_text = new_soup.find('app-show-more-text')
                h2_tag = app_show_more_text.find('h2', class_='reset-heading-styles')
                description_text = h2_tag.text.strip()

                tables = new_soup.find('div', attrs={'class': 'tables'})
                # print(description_text)
                image = new_soup.find('img',
                                      attrs={'class': 'z-1', 'itemprop': "image",
                                             'imageloadbackgroundclass': 'img-loading'})

                all_tables = tables.find_all('tr')
                image = image.get('src')
                title = title.text.strip()
                description = description_text
                author = ""
                publication_date = ""
                isbn = ""
                pages = ""
                for i in all_tables:
                    if i.find('strong').text.strip() == "Auteur":
                        author = i.find('a').text.strip()
                    if i.find('strong').text.strip() == "Publication":
                        publication_date = i.find('span').text.strip()
                    if i.find('strong').text.strip() == "ISBN-13":
                        isbn = i.find('span').text.strip()
                    if i.find('strong').text.strip() == "Pages":
                        pages = i.find('span').text.strip()
                print("++++++++++++++++")
                print(title, author, publication_date, isbn, pages)
                print("++++++++++++++++")
                data = {'Title': title, 'Description': description, 'Author': author,
                        'Publication Date': publication_date,
                        'ISBN': isbn, 'Pages': pages, 'Image URL': image}
                df = pd.DataFrame(data, index=[0])
                csv_file_exists = os.path.exists(csv_file)
                if not csv_file_exists:
                    df.to_csv(csv_file, index=False, header=True)
                else:
                    # Append data to existing CSV file
                    df.to_csv(csv_file, mode='a', index=False, header=False)
            except:
                continue
        else:
            print("no books found")

