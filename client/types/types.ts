export interface bookInterface {
    id: number
    title: string,
    author: string,
    image: string,
    description: string,
    isbn: string,
    pages: string,
    publication: string
}

export interface queryInterface {
    books: bookInterface[],
    items: number
}

