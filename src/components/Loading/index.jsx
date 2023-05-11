import React from 'react';

/** styles */
import { LoadingContainer, LoadingText } from './style';

function Loading({ loadingContent }) {
  return (
    <LoadingContainer>
      <LoadingText>{loadingContent} 입니다...</LoadingText>
    </LoadingContainer>
  );
}

export default Loading;
