import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData } from '@/lib/posts'
import Head from 'next/head'
import PostStyles from '../../styles/Post.module.css'
import { ParsedUrlQuery } from 'querystring'

// postData의 타입 정의
interface PostProps {
    postData: {
      title: string
      date: string
      contentHtml: string
    }
  }
  
  // params 타입 정의 (ParsedUrlQuery 확장)
  interface Params extends ParsedUrlQuery {
    id: string
  }


export default function Post(
    {postData}:{
        postData: {
            title: string,
            date: string,
            contentHtml: string
        }
    }
) {
  return (
    <div className={PostStyles.container}>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={PostStyles.headingXl}>{postData.title}</h1>
            <div className={PostStyles.lightText}>
                {postData.date}
            </div>
            <div 
                className={PostStyles.postContent}
                dangerouslySetInnerHTML={{__html: postData.contentHtml}}
            />
        </article>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
    const paths = getAllPostIds()
    console.log(paths)
    // [{ params: { id: 'ssg-ssr' } }, { params: { id: 'pre-rendering' } }]
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async ({ params }) => {
    if (!params) {
      return { notFound: true }
    }
    const postData = await getPostData(params.id)
    console.log("params", params)
    return {
      props: {
        postData
      }
    }
  }
