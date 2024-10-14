import { appDescription, appName } from '@/config';
import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

type HeadProps = Partial<{
  title?: string;
  description?: string;
}>;

const HeadComponent = ({
  title = '',
  description = appDescription,
}: HeadProps = {}) => {
  return (
    <Helmet title={title ? `${title} | ${appName}` : undefined} defaultTitle={appName}>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export const Head = memo(HeadComponent);
