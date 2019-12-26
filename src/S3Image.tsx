import { Storage } from 'aws-amplify';
import { ContentBlock, ContentState } from 'draft-js';
import React, { useEffect, useState } from 'react';

const S3Image: React.FunctionComponent<S3ImageProps> = ({
  block,
  contentState,
}) => {
  const [s3Url, setS3Url] = useState('');
  const { s3Key } = contentState.getEntity(block.getEntityAt(0)).getData();
  useEffect(() => {
    const getS3Url = async () => {
      const url = (await Storage.get(s3Key)) as string;
      setS3Url(url);
    };
    getS3Url();
  }, [s3Key]);
  return <img src={s3Url} alt="Uploaded" />;
};
type S3ImageProps = {
  block: ContentBlock;
  contentState: ContentState;
};

export default S3Image;
