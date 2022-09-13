import {
  VStack,
  Text,
  Container,
  Stack,
  ButtonGroup,
  IconButton,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FiFacebook, FiInstagram, FiMail } from "react-icons/fi";
import { metadataQuery } from "../lib/queries";
import { getClient } from "../lib/sanity.server";
import Image from "next/image";
import { urlForImage } from "../lib/sanity";

const Footer = () => {
  const [logo, setLogo] = useState(null as any);

  useEffect(() => {
    getClient(false)
      .fetch(metadataQuery)
      .then((m) => setLogo(m.logo));
  }, []);

  return (
    <Box
      bgColor="gray.100"
      as="footer"
      role="contentinfo"
      px={8}
      py={{ base: "12", md: "16" }}
    >
      <Stack spacing={4}>
        <Stack justify="space-between" direction="row" align="center">
          <HStack>
            {logo && (
              <Image height={50} width={50} src={urlForImage(logo).url()} />
            )}
            <Text fontSize="lg" fontWeight="bold">Mosaïk</Text>
          </HStack>

          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="#"
              aria-label="Facebook"
              icon={<FiFacebook fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Instagram"
              icon={<FiInstagram fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Mail"
              icon={<FiMail fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle">
          © {new Date().getFullYear()} Mosaïk
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;
