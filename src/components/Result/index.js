import React from 'react';
import {
    Box,
    Button,
    Stack,
    Text,
  } from '@chakra-ui/react';

import Header from '../Header';


export default function Result({loading, setLoading, setSubmitted, result}) {
    console.log(result , loading);
  return (
    <Box
      w="100%"
      minH="100%"
      display="flex"
      justifyContent="center"
      alignItems="start"
      flexDirection={'column'}
    >
      <Stack
        rounded={'xl'}
        spacing={{ base: 2, md: 4, lg: 8 }}
        maxW={{ base: '100%', md: '90%' }}
      >
        <Header 
          title={"WattWisdom"}
          description={"📈 Your WattWisdom is ready! 🌿 Get your energy consumption insights now."}
          presentation={loading ? "Analyzing your data..." : "Here are your results! 🌟"}  
        />
        {
            loading ?
                    <Text
                        variant="p"
                        color="black"
                        fontFamily={'mono'}
                        fontSize={{ base: 'sm', lg: 'md' }}
                    >
                        Please wait while we process your data ...
                    </Text>
                :
                (
                    <>
                        <Text
                            variant="h1"
                            color="#FF4B4B"
                            fontFamily={'mono'}
                            fontSize={{ base: '4xl', lg: '6xl' }}
                        >
                            {isNaN(parseFloat(result)) ? result : parseFloat(result).toFixed(3)}
                            <Text
                                as={'span'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text"
                            >
                                !
                            </Text>
                        </Text>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            _hover={{
                                bg: 'red.500',
                            }}
                            onClick={() => {
                                setSubmitted(false);
                            }}
                        >
                            Try Again
                        </Button>
                    </>
                )
        }
      </Stack>
    </Box>
  );
}
