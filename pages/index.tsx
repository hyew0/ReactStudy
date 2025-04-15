import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import homeStyles from "@/styles/Home.module.css";
import { NextPage } from "next";
import { getSortedPostData } from "@/lib/posts";
import { GetStaticProps } from "next";

const Home = ({allPostsData}:{
  allPostsData:{
    date: string,
    title: string,
    id: string
  } []
}) => {
  return (
    <div>
      <Head>
        <title>Name</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a website)
        </p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({id, title, date}) => 
            <li className={homeStyles.listItem} key={id}>
              <a>{title}</a>
              <br />
              <small className={homeStyles.lightText}>
                {date}
              </small>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostData();
  return {
    props:{
      allPostsData
    }
  }
}