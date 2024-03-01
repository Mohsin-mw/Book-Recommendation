import csv

books = []


with open('./dataset/book_data.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            line_count += 1
            continue
        temp_book = {'image': row[0], 'title': row[1], 'author': row[2], 'rating': row[3], 'description': row[4],
                     'genres': row[5]}
        books.append(temp_book)
        line_count += 1

