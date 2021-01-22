import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextError = styled.h4``;
const TextSuccess = styled.h4``;
const TextInfo = styled.h4``;

export const toastError = (message) =>
  toast.error(
    <Center>
      <TextError>{message}</TextError>
    </Center>,
  );

export const toastSuccess = (message) =>
  toast.success(
    <Center>
      <TextSuccess>{message}</TextSuccess>
    </Center>,
  );

export const toastInfo = (message) =>
  toast.info(
    <Center>
      <TextInfo>{message}</TextInfo>
    </Center>,
  );
