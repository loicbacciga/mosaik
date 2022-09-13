import { VStack, Heading, Text, Link, HStack } from "@chakra-ui/react";
import { PortableText } from "@portabletext/react";
import NextLink from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface HomeCoursCardProps {
  cours: HomeLecture;
}

const HomeCoursCard = ({ cours }: HomeCoursCardProps) => {
  return (
    <VStack borderWidth={1} p={2} px={3} alignItems="start" borderRadius="md">
      <Heading size="md">{cours.title}</Heading>
      {<PortableText value={cours.short_content} />}

      <NextLink href={`cours/${cours.slug}`} passHref>
        <Link color="blue.600">En savoir plus</Link>
      </NextLink>
    </VStack>
  );
};

export default HomeCoursCard;
