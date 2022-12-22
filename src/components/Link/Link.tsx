import { GatsbyLinkProps, Link as GatsbyLink } from "gatsby";
import { composeClassNames } from "../../styles/composeClassNames";
import { Box, IBoxProps } from "../Box";

interface ILinkProps extends IBoxProps {
  to: GatsbyLinkProps<unknown>["to"];
  activeClassName?: GatsbyLinkProps<unknown>["activeClassName"];
}

export const Link = ({ className = undefined, ...rest }: ILinkProps) => (
  <Box as={GatsbyLink} className={composeClassNames(className)} {...rest} />
);

export const ExternalLink = ({ className = undefined, ...rest }: IBoxProps) => (
  <Box as="a" className={composeClassNames(className)} {...rest} />
);
