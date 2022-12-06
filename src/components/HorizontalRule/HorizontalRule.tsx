import composeClassNames from "../../utils/composeClassNames";
import { Box, IBoxProps } from "../Box";
import { marginStyle, ruleStyle } from "./HorizontalRule.css";

interface IHorizontalRuleProps extends IBoxProps {
  fullWidth?: boolean;
}

export function HorizontalRule({
  className = undefined,
  fullWidth = false,
  ...rest
}: IHorizontalRuleProps) {
  return (
    <Box
      as="hr"
      className={composeClassNames(className, ruleStyle, marginStyle)}
      {...rest}
    />
  );
}

// return (
//   <Container className={composeClassNames(className, marginStyle)} {...rest}>
//     <Box as="hr" className={composeClassNames(ruleStyle)} />
//   </Container>
// );
