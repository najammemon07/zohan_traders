import { Box, Button, Container, Flex, Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';

const products = [
  { size: '600g', label: 'ZT ZAIQO Refined Iodized Salt' },
  { size: '700g', label: 'ZT ZAIQO Refined Iodized Salt' },
  { size: '800g', label: 'ZT ZAIQO Refined Iodized Salt' },
];

export default function App() {
  return (
    <Box bg="#0b0b0b" color="white" minH="100vh">
      <Box as="header" borderBottom="1px solid #252525" position="sticky" top="0" bg="rgba(11,11,11,.94)" backdropFilter="blur(12px)" zIndex="10">
        <Container maxW="1200px" py="18px">
          <Flex align="center" justify="space-between">
            <Heading size="md" letterSpacing="2px" color="#d4af37">ZT</Heading>
            <HStack gap="8" display={{ base: 'none', md: 'flex' }}>
              <Text>Home</Text><Text>About</Text><Text>Products</Text><Text>Contact</Text>
            </HStack>
            <Button bg="#d4af37" color="#111" size="sm" _hover={{ bg: '#e3c45b' }}>Contact Us</Button>
          </Flex>
        </Container>
      </Box>

      <Box bg="linear-gradient(135deg, #111 0%, #17130a 55%, #0b0b0b 100%)">
        <Container maxW="1200px" py={{ base: '90px', md: '140px' }}>
          <VStack align="start" maxW="760px" gap="6">
            <Text color="#d4af37" fontWeight="700" letterSpacing="4px">ZOHAN TRADERS</Text>
            <Heading fontSize={{ base: '46px', md: '72px' }} lineHeight="1.05">Pure Taste.<br /><Box as="span" color="#d4af37">Trusted Quality.</Box></Heading>
            <Text color="#bdbdbd" fontSize={{ base: '17px', md: '20px' }} maxW="650px">Premium refined iodized salt, carefully processed and packed for everyday quality you can trust.</Text>
            <HStack gap="4" pt="3"><Button bg="#d4af37" color="#111" size="lg" _hover={{ bg: '#e3c45b' }}>Explore Products</Button><Button variant="outline" borderColor="#555" size="lg">About Us</Button></HStack>
          </VStack>
        </Container>
      </Box>

      <Container maxW="1200px" py="100px">
        <VStack align="start" gap="3" mb="10"><Text color="#d4af37" fontWeight="700" letterSpacing="3px">OUR PRODUCTS</Text><Heading size="2xl">ZT ZAIQO Refined Iodized Salt</Heading><Text color="#999">Available in convenient pouch sizes for your needs.</Text></VStack>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          {products.map((product) => <Box key={product.size} border="1px solid #2b2b2b" borderRadius="xl" p="8" bg="#111" _hover={{ borderColor: '#d4af37', transform: 'translateY(-4px)' }} transition="all .2s"><Text color="#d4af37" fontSize="42px" fontWeight="800">{product.size}</Text><Heading size="md" mt="4">{product.label}</Heading><Text color="#999" mt="3">Refined • Iodized • Quality Packed</Text></Box>)}
        </SimpleGrid>
      </Container>

      <Box borderTop="1px solid #252525"><Container maxW="1200px" py="35px"><Flex justify="space-between" gap="5" wrap="wrap"><Text color="#888">© 2026 Zohan Traders. All rights reserved.</Text><Text color="#d4af37">REFINED IODIZED SALT</Text></Flex></Container></Box>
    </Box>
  );
}
