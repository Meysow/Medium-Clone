export interface Post {
    _id: string
    _createdAt: string
    title: string
    author: {
        name: string
        image: string
    }
    comment: [Comment]
    description: string
    mainImage: {
        asset: {
            url: string
        }
    }
    slug: {
        current: string
    }
    body: [object]
}

export interface Comment {
    _createdAt: Date
    _id: string
    _rev: string
    _type: string
    _updatedAt: Date
    approved: boolean
    comment: string
    email: string
    name: string
    post: Post
}

export interface Post {
    _ref: string
    _type: string
}
