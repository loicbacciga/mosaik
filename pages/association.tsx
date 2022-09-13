import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { PortableText } from "@portabletext/react";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { associationQuery, equipeQuery } from "../lib/queries";
import { urlForImage } from "../lib/sanity";
import { getClient } from "../lib/sanity.server";

interface AssociationProps {
  associationInfo: AssociationInfo;
  equipe: Equipe[];
}

const Association: NextPage<AssociationProps> = ({
  associationInfo,
  equipe,
}) => {
  console.log(associationInfo, equipe);

  return (
    <Layout preview={false}>
      <VStack alignItems="start">
        <Heading size="2xl">Association</Heading>

        <PortableText value={associationInfo.about} />

        <VStack alignItems="start">
          <Heading size="lg">L'équipe</Heading>

          {equipe.map((e) => (
            <VStack borderWidth="1px" p={1} w={300}>
              <Box w="fit-content" h="full">
                <img src={urlForImage(e.image).url()} />
              </Box>
              <Text fontWeight="semibold">{e.name}</Text>
              <Text>{e.role}</Text>
            </VStack>
          ))}
        </VStack>
      </VStack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<AssociationProps> = async ({
  preview = false,
}) => {
  const associationInfo = await getClient(preview).fetch(associationQuery);
  const equipe = await getClient(preview).fetch(equipeQuery);

  return {
    props: { associationInfo, equipe },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    //revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    revalidate: 60,
  };
};

export default Association;
