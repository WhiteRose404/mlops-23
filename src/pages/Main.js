import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Box,
  } from '@chakra-ui/react';

import Form from '../components/Form';
import globeAnimation from '../utils/globeAnimation';
import Global from '../components/Global';
import Result from '../components/Result';

const Main = () => {
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const { introAnimation, breathAnimation, shadowAnimation } = globeAnimation();
    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();
  }, []);


  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Box
        h={{ base: '100vh', md: '75vh', lg: '75vh', xl: '85vh', }}
        aspectRatio={{ base: 1, md: 2/1 }}
        borderRadius="xl"
        bg="gray.100"
        display={{ base: 'flex', md: 'grid' }}
        gridTemplateColumns="repeat(2, 1fr)"
        gridTemplateRows="1fr"
        justifyContent={{ base: 'center', md: 'center' }}
        overflow="hidden"
      >
        <Box
          h={"100%"}
          bg="white"
          color="black"
          // display="flex"
          // alignItems="center"
          fontWeight="bold"
          p={'5'}
          overflow={'auto'}
        >
          {
            submitted ? 
              <Result 
                loading={loading}
                result={result}
                setSubmitted={setSubmitted}
              />
                :
              <Form 
                loading={loading}
                setLoading={setLoading}
                submitted={submitted}
                setSubmitted={setSubmitted}
                setResult={setResult}
              />
          }
        </Box>
        <Box bg="black" display={{base: "none", md: "block"}}>
          <Global />
        </Box>
      </Box>
    </Flex>
  );
};

export default Main;
