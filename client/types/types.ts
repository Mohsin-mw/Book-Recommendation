export interface bookInterface {
    title: string,
    author: string,
    image: string,
    description: string,
    genres: string[],
    rating: number,
    id: number
}

export interface queryInterface {
    books: bookInterface[],
    items: number
}

