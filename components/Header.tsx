import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { homeLecturesQuery, metadataQuery } from "../lib/queries";
import { urlForImage } from "../lib/sanity";
import { getClient } from "../lib/sanity.server";

interface HeaderProps {
  preview: boolean;
}

const Header = ({ preview }: HeaderProps) => {
  const router = useRouter();
  const [coursInfo, setCoursInfo] = useState([] as HomeLecture[]);
  const [logo, setLogo] = useState(null as any);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getClient(preview).fetch(homeLecturesQuery).then(setCoursInfo);
    getClient(preview)
      .fetch(metadataQuery)
      .then((m) => setLogo(m.logo));
  }, []);

  const splitPath = router.asPath.split("/");
  const isCoursActive = splitPath.length > 1 ? splitPath[1] === "cours" : false;

  console.log(isCoursActive);

  return (
    <header>
      <HStack as="nav" p={4} px={4} bgColor="gray.100" justify="space-between">
        <HStack>
          {logo && (
            <Image height={50} width={50} src={urlForImage(logo).url()} />
          )}
          <Heading size="lg">Mosaïk</Heading>
        </HStack>

        <ButtonGroup variant="link" spacing={3}>
          <Button
            onClick={() => router.push("/")}
            isActive={router.asPath === "/"}
          >
            Accueil
          </Button>

          <Menu closeOnSelect={true} isOpen={isOpen}>
            <MenuButton
              as={Button}
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
            >
              <Text color={isCoursActive ? "gray.700" : undefined}>
                Nos cours
              </Text>
            </MenuButton>
            <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
              {coursInfo.map((cours) => (
                <MenuItem
                  onClick={() => {
                    router.push(`/cours/${cours.slug}`);
                    onClose();
                  }}
                  key={cours._id}
                >
                  {cours.title}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Button
            onClick={() => router.push("/association")}
            isActive={router.asPath === "/association"}
          >
            Association
          </Button>
        </ButtonGroup>
      </HStack>
    </header>
  );
};

export default Header;
