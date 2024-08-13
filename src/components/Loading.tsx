import React from 'react';
import {Flex} from "@chakra-ui/react";
import {ScaleLoader} from "react-spinners";

const Loading = () => {
  return (
    <Flex w={'100%'} h={200} justify={'center'} align={'center'}>
      <ScaleLoader color={'#81E6D9'} />
    </Flex>
  );
};

export default Loading;
