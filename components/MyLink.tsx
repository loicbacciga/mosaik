import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface MyLinkProps {
  href: string,
  children: any
}

const MyLink = (props: MyLinkProps) => {
  const { href, children } = props;

  return (
    <NextLink href={href} passHref>
      <Link>{children}</Link>
    </NextLink>
  );
};

export default MyLink;
