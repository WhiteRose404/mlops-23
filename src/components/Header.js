import React from 'react';
import {
    Box,
    Heading,
    Stack,
    Text,
  } from '@chakra-ui/react';
  

export default function Header({title, description, presentation, clicked}) {
    return (
        <Stack spacing={4}>
            <Heading
                variant={'h1'}
                color={'rgb(255,75,75)'}
                fontFamily={'sans-serif'}
                fontWeight={'900'}
                fontSize={{ base: '4xl', lg: '6xl' }}
            >
                {title}
                <Text
                    as={'span'}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                >
                    !
                </Text>
            </Heading>
            <Box>
                <Text variant="p" color="black" fontFamily={'mono'} fontSize={{ base: 'sm', lg: 'md' }}>
                    {description}
                </Text>
                <Text variant="p" color="black" fontFamily={'mono'} fontSize={{ base: 'sm', lg: 'md' }}>
                    {presentation} {clicked && <span onClick={clicked} style={{ cursor: "pointer" }}>🌟</span>}
                </Text>
            </Box>
        </Stack>
    )
}
