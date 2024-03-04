import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import pickle


movies = pd.read_csv('dataset/book_data.csv')

movies['tags'] = movies['Title'] + ' ' + movies['Author'] + ' ' + movies['Description'] + ' ' + movies['Genres'].apply(
    lambda x: ' '.join(x))
new_data = movies
cv = CountVectorizer(max_features=1606, stop_words='english')
vector = cv.fit_transform(new_data['tags'].values.astype('U')).toarray()

similarity = cosine_similarity(vector)
var = new_data[new_data['Title'] == "Educated"].index[0]


def recommend(movies, num_recommendations=10):
    if movies not in new_data['Title'].values:  # Check if the book title exists in the dataset
        # If the book title doesn't exist, recommend random books
        random_books_indices = random.sample(range(len(new_data)), num_recommendations)
        recommendations = []
        for i in random_books_indices:
            book_info = new_data.iloc[i]
            recommendations.append({
                'Title': book_info.Title,
                'Author': book_info.Author,
                'Rating': book_info.Rating,
                'Description': book_info.Description,
                'Genres': book_info.Genres,
                'Image': book_info.Image
            })
    else:
        index = new_data[new_data['Title'] == movies].index[0]
        distance = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda vector: vector[1])
        recommendations = []
        for i in distance[1:num_recommendations + 1]:
            book_info = new_data.iloc[i[0]]
            recommendations.append({
                'Title': book_info.Title,
                'Author': book_info.Author,
                'Rating': book_info.Rating,
                'Description': book_info.Description,
                'Genres': book_info.Genres,
                'Image': book_info.Image
            })
    return recommendations

#
book_title = "Memoir"
recommendations = recommend(book_title)
for book_title in recommendations:
    book = new_data[new_data['Title'] == book_title].iloc[0]  # Retrieve book information by title
    print("Title:", book['Title'])
    print("Author:", book['Author'])
    print("Rating:", book['Rating'])
    print("Description:", book['Description'])
    print("Genres:", book['Genres'])
    print("Image:", book['Image'])


pickle.dump(similarity, open('similarity.pkl', 'wb'))
pickle.dump(new_data, open('movies_list.pkl', 'wb'))
