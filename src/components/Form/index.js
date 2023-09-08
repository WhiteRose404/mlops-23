import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Stack,
    Text,
    Select,
    useToast,
  } from '@chakra-ui/react';


import InputText from '../Input/InputText';
import InputFile from '../Input/InputFile';
import fetchResult from '../../utils/fetchResult';
import checkInputs from '../../utils/checkInputs';



import Header from '../Header';


export default function Form({loading, setLoading, setSubmitted, setResult}) {
  const makeDescription = (text, links) => {
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'start'}
        gap={4}
        mt={2}
      >
        <Text
          variant="p"
          color="black"
          fontFamily={'mono'}
          fontSize={{ base: 'xs', lg: 'sm' }}
        >
          {text}:
        </Text>
    </Box>
    )
  }
  
  const simple = (value) => {
    return value;
  };

  const toast = useToast();
  const [file, setFile] = useState(null);
  const [span, setSpan] = useState("");
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
          description={"🔌 Welcome to WattWisdom! 🌟 Input your data for precise power consumption forecasts in your region. Empower your operations and stay ahead in the energy game. Start optimizing now for a more efficient grid! ⚡🌐"}
          presentation={"Get started now!"}
          clicked={()=>{
            console.log("clicked");
          }}
        />
        <Box as={'form'} mt={{base: '2', lg: '4'}}>
          <Stack spacing={4}>
            <InputFile
                target={file} setTarget={setFile} label="Power Consumption" Description={makeDescription("Enter your Region history of power consumption")}
            />
            <InputText target={span} type={"number"} unformat={simple} format={simple} setTarget={setSpan} label="Data Time Span" Description={makeDescription("How far the data you provided goes back, for instance whether the data submited is for the last 4 hours or 48 hours",)} />
          </Stack>
          <Button
            fontFamily={'heading'}
            mt={8}
            w={'full'}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={'white'}
            _hover={{
              bgGradient: 'linear(to-r, red.400,pink.400)',
              boxShadow: 'xl',
            }}
            onClick={ async (e) => {
                e.preventDefault();
                const inputs = {file, span};
                const diagnoseResult = checkInputs(inputs);
                if(diagnoseResult) {
                  toast({
                    title: "Error",
                    description: diagnoseResult,
                    status: "error",
                    isClosable: true,
                    duration: 5000,
                  })
                  return;
                }
                localStorage.setItem('data', JSON.stringify(inputs));
                setLoading(true);
                setSubmitted(true);
                let res = await fetchResult(inputs);
                console.log("result;",res);
                if(res.status === 'error' || isNaN(parseFloat(res.data))){
                  toast({
                    title: "Backend Warning",
                    description: "Backend Infrastucture is built, please wait for a few seconds.",
                    status: "warning",
                    isClosable: true,
                    duration: 5000,
                  });
                  res = await fetchResult(inputs);
                }
                setLoading(false);
                if(res.status === 'error' || isNaN(parseFloat(res.data))){
                  setResult("Server Faileur 😭 --");
                  return;
                }
                setResult(res.data);
            }}
          >
            {loading ? 'Loading...' : 'Predict'}
          </Button>
        </Box>
        form
      </Stack>
    </Box>
  );
}
