import Head from "next/head";
import Alert from "./alert";
import Footer from "./Footer";
import Meta from "./meta";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import Header from "./Header";

export default function Layout({ preview, children }) {
  return (
    <>
      <Head>
        <title>Mosaïk</title>
      </Head>
      <Meta />

      <Box minH="80vh">
        <Alert preview={preview} />
        <Header preview={preview} />
        <main>
          <Box px={6} py={4}>
            {children}
          </Box>
          
        </main>
      </Box>

      <Footer />
    </>
  );
}
