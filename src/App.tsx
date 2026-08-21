import { useState, type ReactNode } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

const products = [
  { size: '600g', tag: 'Everyday', description: 'A practical family-size pouch for daily cooking.' },
  { size: '700g', tag: 'Popular', description: 'A balanced size made for regular household use.' },
  { size: '800g', tag: 'Value', description: 'Extra quantity for families that use more every day.' },
];

const cartonOptions = [1, 2, 3, 4, 5, 10];

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Products', '#products'],
  ['Cartons', '#cartons'],
  ['Contact', '#contact'],
];

function AppLinkButton({ href, children, className, size = 'md' }: { href: string; children: ReactNode; className: string; size?: 'sm' | 'md' | 'lg' }) {
  return <Button asChild className={className} size={size}><a href={href}>{children}</a></Button>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box bg="#080808" color="white" minH="100vh">
      <Box as="header" position="sticky" top="0" zIndex="20" bg="rgba(8,8,8,.88)" backdropFilter="blur(18px)" borderBottom="1px solid rgba(212,175,55,.14)">
        <Container maxW="1200px" py="16px">
          <Flex align="center" justify="space-between">
            <a href="#home" aria-label="Zohan Traders home"><HStack gap="3"><Box className="brand-mark">ZT</Box><Box display={{ base: 'none', sm: 'block' }}><Text fontWeight="800" letterSpacing="2px" fontSize="14px">ZOHAN TRADERS</Text><Text color="#a6a6a6" fontSize="9px" letterSpacing="2.5px">REFINED SALT</Text></Box></HStack></a>
            <HStack gap="7" display={{ base: 'none', md: 'flex' }}>{navItems.map(([label, href]) => <a className="nav-link" key={label} href={href}>{label}</a>)}</HStack>
            <HStack gap="3"><Box display={{ base: 'none', sm: 'block' }}><AppLinkButton href="#contact" className="gold-button" size="sm">Get in Touch</AppLinkButton></Box><IconButton aria-label="Toggle navigation" display={{ base: 'inline-flex', md: 'none' }} variant="outline" borderColor="#333" onClick={() => setMenuOpen(!menuOpen)}><Box as="span" fontSize="22px">{menuOpen ? '×' : '☰'}</Box></IconButton></HStack>
          </Flex>
          {menuOpen && <VStack align="stretch" pt="5" pb="2" gap="1" display={{ md: 'none' }}>{navItems.map(([label, href]) => <a className="mobile-link" key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</VStack>}
        </Container>
      </Box>

      <Box id="home" className="hero-section"><Container maxW="1200px" py={{ base: '88px', md: '145px' }}><SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: '12', lg: '20' }} alignItems="center"><VStack align="start" gap="6"><HStack className="eyebrow" gap="3"><Box className="eyebrow-line" /><Text>QUALITY YOU CAN TRUST</Text></HStack><Heading className="hero-title" fontSize={{ base: '48px', sm: '62px', md: '78px' }} lineHeight=".98">Pure Taste.<br /><Box as="span" className="gold-text">Trusted Quality.</Box></Heading><Text color="#b8b8b8" fontSize={{ base: '16px', md: '19px' }} lineHeight="1.8" maxW="610px">Premium refined iodized salt from Zohan Traders — carefully processed, hygienically packed and made for everyday cooking.</Text><HStack gap="4" pt="2" flexWrap="wrap"><AppLinkButton href="#products" className="gold-button" size="lg">Explore Products</AppLinkButton><AppLinkButton href="#about" className="dark-button" size="lg">Our Story</AppLinkButton></HStack><HStack pt="5" gap={{ base: '6', md: '10' }} flexWrap="wrap">{['Refined', 'Iodized', 'Quality Packed'].map((item) => <HStack key={item} gap="2"><Box className="check-dot">✓</Box><Text color="#c9c9c9" fontSize="13px">{item}</Text></HStack>)}</HStack></VStack><Box className="hero-badge" display={{ base: 'none', lg: 'block' }}><Box className="hero-circle"><Text className="circle-small">ZT</Text><Text className="circle-title">ZAIQO</Text><Text className="circle-subtitle">REFINED IODIZED SALT</Text><Box className="circle-divider" /><Text className="circle-copy">Pure • Clean • Reliable</Text></Box></Box></SimpleGrid></Container></Box>

      <Box className="trust-strip"><Container maxW="1200px" py="6"><SimpleGrid columns={{ base: 2, md: 4 }} gap="5">{[['01', 'Refined Quality'], ['02', 'Iodized Salt'], ['03', 'Clean Packaging'], ['04', 'Trusted Brand']].map(([number, title]) => <HStack key={number} gap="3"><Text color="#d4af37" fontWeight="800">{number}</Text><Text color="#bdbdbd" fontSize="13px">{title}</Text></HStack>)}</SimpleGrid></Container></Box>

      <Box id="about" className="section-light"><Container maxW="1200px" py={{ base: '80px', md: '110px' }}><SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10', md: '20' }} alignItems="center"><VStack align="start" gap="5"><Text className="section-kicker">ABOUT ZOHAN TRADERS</Text><Heading fontSize={{ base: '36px', md: '52px' }} lineHeight="1.05">Simple product.<br /><Box as="span" className="gold-text">Serious standards.</Box></Heading><Text color="#a7a7a7" lineHeight="1.9" maxW="570px">Zohan Traders is focused on delivering dependable refined iodized salt with a clean, premium presentation. Our ZT ZAIQO range is designed around consistency, quality and value.</Text><AppLinkButton href="#contact" className="dark-button">Talk to Zohan Traders</AppLinkButton></VStack><Box className="about-card"><Text className="about-card-label">ZT ZAIQO</Text><Heading fontSize="32px" mt="3">Refined Iodized Salt</Heading><Text color="#999" mt="4" lineHeight="1.8">A modern salt brand built for households, retailers and growing distribution.</Text><Box className="gold-rule" /><Text color="#d4af37" fontSize="12px" letterSpacing="3px">ZOHAN TRADERS</Text></Box></SimpleGrid></Container></Box>

      <Box id="products"><Container maxW="1200px" py={{ base: '80px', md: '110px' }}><Flex justify="space-between" align={{ base: 'start', md: 'end' }} gap="6" mb="10" direction={{ base: 'column', md: 'row' }}><VStack align="start" gap="3"><Text className="section-kicker">OUR PRODUCTS</Text><Heading fontSize={{ base: '34px', md: '48px' }}>ZT ZAIQO Range</Heading></VStack><Text color="#777" maxW="390px" lineHeight="1.7">Choose the pouch size that fits your home or retail needs.</Text></Flex><SimpleGrid columns={{ base: 1, md: 3 }} gap="6">{products.map((product) => <Box className="product-card" key={product.size}><Flex justify="space-between" align="start"><Text className="product-size">{product.size}</Text><Text className="product-tag">{product.tag}</Text></Flex><Heading size="md" mt="8">ZT ZAIQO</Heading><Text color="#d4af37" fontSize="13px" mt="2">REFINED IODIZED SALT</Text><Text color="#888" mt="5" lineHeight="1.7">{product.description}</Text><Box className="product-footer"><Text color="#777" fontSize="12px">Premium everyday quality</Text><Text color="#d4af37">→</Text></Box></Box>)}</SimpleGrid></Container></Box>

      <Box id="cartons" className="carton-section"><Container maxW="1200px" py={{ base: '75px', md: '100px' }}><VStack align="start" gap="4" mb="10"><Text className="section-kicker">CARTON PACKING</Text><Heading fontSize={{ base: '36px', md: '50px' }}>Every carton. <Box as="span" className="gold-text">24 pieces.</Box></Heading><Text color="#999" maxW="680px" lineHeight="1.8">Scan the QR code printed on our carton to visit Zohan Traders and quickly check the standard packing quantity.</Text></VStack><Box className="carton-highlight"><Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" gap="8"><VStack align={{ base: 'center', md: 'start' }} gap="2"><Text className="carton-big">24</Text><Text color="#d4af37" fontWeight="800" letterSpacing="3px" fontSize="12px">PIECES PER CARTON</Text><Text color="#777" fontSize="13px" textAlign={{ base: 'center', md: 'left' }}>Standard ZT ZAIQO carton packing</Text></VStack><Box className="carton-formula"><Text color="#888" fontSize="11px" letterSpacing="2px">QUANTITY GUIDE</Text><VStack align="stretch" gap="2" mt="4">{cartonOptions.map((cartons) => <HStack key={cartons} justify="space-between" className="quantity-row"><Text color="#ccc">{cartons} {cartons === 1 ? 'Carton' : 'Cartons'}</Text><Text color="#d4af37" fontWeight="800">{cartons * 24} Pieces</Text></HStack>)}</VStack></Box></Flex></Box><Text mt="5" color="#555" fontSize="11px" textAlign="center" w="full">1 Carton = 24 Pieces • 2 Cartons = 48 Pieces • 3 Cartons = 72 Pieces</Text></Container></Box>

      <Box id="contact" className="contact-section"><Container maxW="1200px" py={{ base: '75px', md: '95px' }}><SimpleGrid columns={{ base: 1, md: 2 }} gap="10" alignItems="center"><VStack align="start" gap="4"><Text className="section-kicker">CONTACT</Text><Heading fontSize={{ base: '38px', md: '54px' }}>Let’s build a<br /><Box as="span" className="gold-text">trusted partnership.</Box></Heading><Text color="#999" maxW="520px" lineHeight="1.8">For product inquiries, wholesale orders and distribution opportunities, get in touch with Zohan Traders.</Text></VStack><Box className="contact-card"><Text color="#888" fontSize="12px" letterSpacing="2px">ZOHAN TRADERS</Text><Text fontSize="20px" fontWeight="700" mt="3">Refined Salt Business</Text><Text color="#999" mt="3">Hyderabad, Site Area, Pakistan</Text><Box className="gold-rule" /><Text color="#d4af37" fontWeight="700">0313 3976670</Text><Text color="#d4af37" fontWeight="700" mt="1">0309 7431271</Text><Box mt="6" w="full"><AppLinkButton href="tel:+923133976670" className="gold-button">Call Us</AppLinkButton></Box></Box></SimpleGrid></Container></Box>

      <Box as="footer" className="site-footer"><Container maxW="1200px" py={{ base: '55px', md: '65px' }}><SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={{ base: '10', md: '8' }}><VStack align="start" gap="4"><HStack gap="3"><Box className="brand-mark">ZT</Box><Box><Text fontWeight="800" letterSpacing="2px" fontSize="14px">ZOHAN TRADERS</Text><Text color="#888" fontSize="9px" letterSpacing="2.5px">REFINED SALT</Text></Box></HStack><Text color="#777" fontSize="13px" lineHeight="1.8" maxW="270px">Quality refined iodized salt, carefully packed for homes, retailers and growing businesses.</Text></VStack><VStack align="start" gap="3"><Text className="footer-heading">QUICK LINKS</Text>{navItems.map(([label, href]) => <a className="footer-link" key={label} href={href}>{label}</a>)}</VStack><VStack align="start" gap="3"><Text className="footer-heading">OUR BRAND</Text><Text color="#d4af37" fontWeight="700">ZT ZAIQO</Text><Text color="#777" fontSize="13px">Refined Iodized Salt</Text><Text color="#777" fontSize="13px">600g • 700g • 800g</Text></VStack><VStack align="start" gap="3"><Text className="footer-heading">CONTACT</Text><Text color="#999" fontSize="13px">📍 Hyderabad, Site Area, Pakistan</Text><a className="footer-link" href="tel:+923133976670">0313 3976670</a><a className="footer-link" href="tel:+923097431271">0309 7431271</a></VStack></SimpleGrid><Box className="footer-bottom"><Text color="#666" fontSize="12px">© 2026 Zohan Traders. All rights reserved.</Text><Text color="#555" fontSize="11px" letterSpacing="1.5px">PURE • CLEAN • RELIABLE</Text></Box></Container></Box>
    </Box>
  );
}
