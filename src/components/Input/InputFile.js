import React from 'react';
import {
    Box,
    Text,
    Input,
    InputGroup,
    InputLeftAddon,
    IconButton,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Button,
    // hooks
    useDisclosure,
  } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

export default function InputFile({ label, placeholder, target, setTarget, format, unformat, type, Description }) {
    if(placeholder === undefined) placeholder = "Upload a file";
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box display={'flex'} alignItems={'center'} gap={4}>
                <Text
                    variant="label"
                    color="black"
                    fontFamily={'mono'}
                    fontSize={{ base: 'sm', lg: 'md' }}
                >
                    {label}:
                </Text>
                <InputGroup
                    bg={'gray.100'}
                    borderRadius={'md'}
                >
                    <Input
                        placeholder={placeholder}
                        // value={format(target)}
                        border={0}
                        
                        borderStartRadius={'md'}
                        type="file"
                        accept='.csv'
                        color={'gray.600'}
                        _placeholder={{
                            color: 'gray.500',
                        }}
                        onChange={(e) => {
                            setTarget(e.target.value);
                        }}
                    />
                    <InputLeftAddon
                        border={0}
                        outline={'none'}
                        borderEndRadius={'md'}
                    >
                        <IconButton
                            variant={'ghost'}
                            border={0}
                            outline={'none'}
                            onClick={isOpen ? onClose : onOpen}
                        >
                            <Icon 
                                as={QuestionOutlineIcon}
                            />
                        </IconButton>
                    </InputLeftAddon>
                </InputGroup>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size={{base: 'full', lg: 'lg'}}>
                <ModalContent>
                    <ModalHeader>{label}</ModalHeader>
                    <ModalBody>
                            {Description}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="orange" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
