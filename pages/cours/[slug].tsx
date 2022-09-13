import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";
import Layout from "../../components/Layout";
import {
  lectureQuery,
  lectureSlugsQuery,
  partenairesQuery,
} from "../../lib/queries";
import { urlForImage, usePreviewSubscription } from "../../lib/sanity";
import { getClient, sanityClient } from "../../lib/sanity.server";

interface CoursProps {
  cours: AllLecture;
  preview: boolean;
}

const Cours: NextPage<CoursProps> = ({ cours: initialCours, preview }) => {
  const router = useRouter();

  const slug = initialCours?.slug;
  const { data: cours } = usePreviewSubscription(lectureQuery, {
    params: { slug },
    initialData: initialCours,
    enabled: preview && initialCours !== undefined,
  });
  console.log("TST", slug, cours)

  const [partenaires, setPartenaires] = useState([] as Partenaire[]);
  const [usedPartenaires, setUsedPartenaires] = useState([] as Partenaire[]);

  // Fetch full list of partenaires
  useEffect(() => {
    getClient(preview).fetch(partenairesQuery).then(setPartenaires);
  }, []);

  useEffect(() => {
    if (!cours || !cours.partenaires) return;

    setUsedPartenaires(
      partenaires.filter((p) =>
        cours.partenaires.some((p2) => p2._ref === p._id)
      )
    );
  }, [partenaires, cours]);

  
  if ((!router.isFallback && !initialCours) || !cours) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <VStack alignItems="start" spacing={8}>
        {/* CONTENT */}
        <VStack alignItems="start" spacing={4}>
          <Heading size="2xl">{cours.title}</Heading>

          <PortableText value={cours.long_content} />

          <Text>Nous contacter pour un devis:</Text>
          <Button>
            <HStack>
              <FiMail />
              <Text>Contact par mail</Text>
            </HStack>
          </Button>
        </VStack>

        {usedPartenaires.length > 0 && (
          <>
            <Heading size="lg">Partenaires</Heading>
            <Wrap gap={4}>
              {usedPartenaires.map((p) => (
                <VStack borderWidth="1px" p={1} w={300}>
                  <Box w="fit-content" h="full">
                    {/*<Image
                    alt="TODO"
                    layout="fill"
                    objectFit="contain"
                    src={urlForImage(p.image).url()}
            />*/}
                    <img src={urlForImage(p.image).url()} />
                  </Box>
                  <Text fontWeight="semibold">{p.name}</Text>
                </VStack>
              ))}
            </Wrap>
          </>
        )}
      </VStack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const cours = await getClient(preview).fetch(lectureQuery, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      cours,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};

export default Cours;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(lectureSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};
