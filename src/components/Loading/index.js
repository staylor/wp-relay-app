import React from 'react';
import { Container, ActivityIndicator } from 'wp-styled-components/lib/Loading';

export default function Loading() {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
}
