import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import pickle
from random import sample

movies = pd.read_csv('../dataset/french_books.csv')


movies['tags'] = movies['Title'] + ' ' + movies['Description'] + ' ' + movies['Author'] + ' ' + movies['Publication'].astype(str) + ' ' + movies['ISBN'].astype(str) + ' ' + movies['Pages'].astype(str) + ' ' + movies['Image'].apply(lambda x: ' '.join(x))

new_data = movies
cv = CountVectorizer(max_features=1039, stop_words='english')
vector = cv.fit_transform(new_data['tags'].values.astype('U')).toarray()

similarity = cosine_similarity(vector)


def recommend(movies, num_recommendations=10):
    if movies not in new_data['Title'].values:  # Check if the book title exists in the dataset
        # If the book title doesn't exist, recommend random books
        random_books_indices = sample(range(len(new_data)), num_recommendations)
        recommendations = []
        for i in random_books_indices:
            book_info = new_data.iloc[i]
            recommendations.append({
                'Title': book_info.Title,
                'Description': book_info.Description,
                'Author': book_info.Author,
                'Publication': book_info.Publication,
                'ISBN': str(book_info.ISBN),
                'Pages': book_info.Pages,
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
                'Description': book_info.Description,
                'Author': book_info.Author,
                'Publication': book_info.Publication,
                'ISBN': str(book_info.ISBN),
                'Pages': book_info.Pages,
                'Image': book_info.Image
            })
    return recommendations



pickle.dump(similarity, open('../../../Book-Recommendation-Backend/models/similarity.pkl', 'wb'))
pickle.dump(new_data, open('../../../Book-Recommendation-Backend/models/movies_list.pkl', 'wb'))
