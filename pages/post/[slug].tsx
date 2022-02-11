import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface FormInput {
    _id: string
    name: string
    email: string
    comment: string
}

interface Props {
    post: Post
}

function Post({ post }: Props) {
    const [submitted, setSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>()

    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        await fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(() => {
                console.log(data)
                setSubmitted(true)
            })
            .catch((err) => {
                console.log(err)
                setSubmitted(false)
            })
    }

    return (
        <main>
            <Header />

            <img
                className="h-40 w-full object-cover"
                src={urlFor(post.mainImage).url()!}
                alt="banner"
            />

            <article className="mx-auto max-w-3xl p-5">
                <h3 className="mt-10 mb-3 text-3xl">{post.title}</h3>
                <h4 className="text-grey-500 mb-2 text-xl font-light">
                    {post.description}
                </h4>

                <div className="flex items-center space-x-2">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={urlFor(post.author.image).url()!}
                        alt="profile"
                    />
                    <p className="text-sm font-extralight">
                        Blog Post By{' '}
                        <span className="font-light text-green-600">
                            {post.author.name}
                        </span>{' '}
                        - Published at{' '}
                        {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>

                <div className="mt-10">
                    <PortableText
                        className=""
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body}
                        serializers={{
                            h1: (props: any) => (
                                <h3
                                    className="my-5 text-3xl font-bold"
                                    {...props}
                                />
                            ),
                            h2: (props: any) => (
                                <h4
                                    className="my-5 text-2xl font-bold"
                                    {...props}
                                />
                            ),
                            h3: (props: any) => (
                                <h5
                                    className="my-5 text-xl font-bold"
                                    {...props}
                                />
                            ),
                            h4: (props: any) => (
                                <h6
                                    className="my-5 text-xl font-bold"
                                    {...props}
                                />
                            ),
                            li: ({ children }: any) => (
                                <li className="ml-4 list-disc">{children}</li>
                            ),
                            link: ({ href, children }: any) => (
                                <a
                                    href={href}
                                    className="text-blue-500 hover:underline"
                                >
                                    {children}
                                </a>
                            ),
                        }}
                    />
                </div>
            </article>

            <hr className="my-5 mx-auto max-w-lg border-yellow-500" />

            {submitted ? (
                <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
                    <h3 className="text-3xl font-bold">
                        Thank you for submitting your comment !
                    </h3>
                    <p>Once it has been approved, it will apear below.</p>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="my-10 mx-auto mb-10 flex max-w-2xl flex-col p-5"
                >
                    <h4 className="text-sm text-yellow-500">
                        Enjoyed this article ?
                    </h4>
                    <h5 className="text-3xl font-bold">
                        Leave a comment below !
                    </h5>
                    <hr className="mt-2 py-3" />

                    <input // Hidden Input to assign our comments an ID //
                        {...register('_id')}
                        type="hidden"
                        name="_id"
                        value={post._id}
                    />

                    <label className="mb-5 block">
                        <span className="text-gray-700 ">Name</span>
                        <input
                            {...register('name', { required: true })}
                            className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring-2"
                            placeholder="Your Name"
                            type="text"
                        />
                    </label>
                    <label className="mb-5 block">
                        <span className="text-gray-700 ">Email</span>
                        <input
                            {...register('email', { required: true })}
                            className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring-2"
                            placeholder="your@email.com"
                            type="text"
                        />
                    </label>
                    <label className="mb-5 block">
                        <span className="text-gray-700 ">Comment</span>
                        <textarea
                            {...register('comment', { required: true })}
                            className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring-2"
                            placeholder="Your Comment"
                            rows={8}
                        />
                    </label>

                    <div className="flex-col p-5">
                        {errors.name && (
                            <span className="text-red-500">
                                - The Name Field is required
                            </span>
                        )}
                        {errors.comment && (
                            <span className="text-red-500">
                                - The Comment Field is required
                            </span>
                        )}
                        {errors.email && (
                            <span className="text-red-500">
                                - The Email Field is required
                            </span>
                        )}
                    </div>

                    <input
                        className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
                        type="submit"
                        name=""
                        id=""
                    />
                </form>
            )}

            {/* Comments */}
            <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-yellow-500">
                <h4 className="text-4xl">Comments</h4>
                <hr className="pb-2" />

                {post.comment.map((com) => (
                    <div key={com._id}>
                        <p>
                            <span className="text-yellow-500">
                                {com.name} :
                            </span>{' '}
                            {com.comment}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Post

export const getStaticPaths = async () => {
    const query = `*[_type == 'post'] {
        _id,
        slug {
            current
        }
    }`

    const posts = await sanityClient.fetch(query)

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        },
    }))

    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == 'post' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
            name,
            image,
        },
        'comment': *[
            _type == 'comment' &&
            post._ref == ^._id &&
            approved == true
        ],
        description,
        mainImage,
        slug,
        body,
    }`

    const post = await sanityClient.fetch(query, { slug: params?.slug })

    if (!post) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            post,
        },
        revalidate: 180, // Cache will be updated every 180sec
    }
}
