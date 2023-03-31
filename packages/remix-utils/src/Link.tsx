import ClickableStyle from '@chanzuckerberg/eds/lib/components/ClickableStyle';
import type {ClickableStyleProps} from '@chanzuckerberg/eds/lib/components/ClickableStyle';
import {Link as RemixLink} from '@remix-run/react';

type Props = ClickableStyleProps<typeof RemixLink>;

/**
 * Link, AKA anchor. @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 *
 * Combines the EDS and Remix Link components. Use to link to other Remix routes or external pages.
 *
 * Takes all EDS link props.
 * @link https://chanzuckerberg.github.io/edu-design-system/?path=/story/components-link
 */
export default function Link({children, variant, ...other}: Props) {
  return (
    <ClickableStyle as={RemixLink} variant={variant || 'link'} {...other}>
      {children}
    </ClickableStyle>
  );
}
