import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { PortableText } from "@portabletext/react";
import { GetStaticProps, NextPage } from "next";
import HomeCoursCard from "../components/HomeCoursCard";
import Layout from "../components/Layout";
import { homeLecturesQuery, indexInfoQuery, indexQuery } from "../lib/queries";
import { usePreviewSubscription } from "../lib/sanity";
import { getClient, overlayDrafts } from "../lib/sanity.server";

interface IndexProps {
  indexInfo: IndexInfo;
  homeCoursInfo: HomeLecture[];

  preview: boolean;
  allPosts: any;
}

const Index: NextPage<IndexProps> = ({
  preview,
  indexInfo,
  homeCoursInfo: initalHomeCoursInfo,
}) => {
  const { data: homeCoursInfo } = usePreviewSubscription(homeLecturesQuery, {
    initialData: initalHomeCoursInfo,
    enabled: preview,
  });

  return (
    <Layout preview={preview}>
      <VStack spacing={4} alignItems="start">
        <PortableText value={indexInfo.intro_paragraph} />

        <Heading>Nos cours</Heading>

        <SimpleGrid columns={2} gap={4}>
          {homeCoursInfo.map((cours) => (
            <HomeCoursCard cours={cours} />
          ))}
        </SimpleGrid>

        {/*<Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </Container>*/}
      </VStack>
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps<IndexProps> = async ({
  preview = false,
}) => {
  const indexInfo = await getClient(preview).fetch(indexInfoQuery);
  const homeCoursInfo = overlayDrafts(await getClient(preview).fetch(homeLecturesQuery));

  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
  return {
    props: { allPosts, preview, indexInfo, homeCoursInfo },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};
