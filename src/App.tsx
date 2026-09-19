import { useState, type ReactNode } from 'react';
import Dashboard from './Dashboard';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

const products = [
  { size: '400g', tag: 'Compact', description: 'A convenient compact pouch for everyday cooking and smaller households.' },
  { size: '600g', tag: 'Everyday', description: 'A practical family-size pouch for daily cooking.' },
  { size: '700g', tag: 'Popular', description: 'A balanced size made for regular household use.' },
  { size: '800g', tag: 'Value', description: 'Extra quantity for families that use more every day.' },
];

const cartonPacking = [
  { size: '400g', pieces: 48 },
  { size: '600g', pieces: 24 },
  { size: '700g', pieces: 24 },
  { size: '800g', pieces: 24 },
];

const exportOptions = [
  { title: 'Retail Pouches', detail: '400g • 600g • 700g • 800g', copy: 'Retail-ready pouch sizes available according to customer requirements.' },
  { title: '25kg Bags', detail: 'Bulk Packaging', copy: 'Bulk salt packing for distributors, importers and commercial buyers.' },
  { title: '50kg Bags', detail: 'Bulk Packaging', copy: 'Large-volume packing for customers with higher quantity requirements.' },
  { title: 'Custom Demand', detail: 'Flexible Packing', copy: 'Packaging format and quantity can be discussed according to the customer’s requirement.' },
];

function AppLinkButton({ href, children, className, size = 'md' }: { href: string; children: ReactNode; className: string; size?: 'sm' | 'md' | 'lg' }) {
  return <Button asChild className={className} size={size}><a href={href}>{children}</a></Button>;
}

export default function App() {
  const [profileOpen, setProfileOpen] = useState(false);
  const session = (() => {
    try {
      return JSON.parse(localStorage.getItem('zohan_traders_session') || '{}') as { name?: string; email?: string; shop?: string };
    } catch {
      return {};
    }
  })();
  const userName = session.name || 'User';
  const userEmail = session.email || '';
  const initials = userName.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'U';

  return (
    <Box bg="#080808" color="white" minH="100vh">
      <Box as="header" className="top-navbar">
        <Container maxW="1200px">
          <Flex align="center" justify="space-between" gap="6" minH="72px">
            <a href="#dashboard" aria-label="Zohan Traders home">
              <HStack gap="3">
                <Box className="brand-mark">ZT</Box>
                <Box display={{ base: 'none', sm: 'block' }}>
                  <Text fontWeight="800" letterSpacing="2px" fontSize="14px">ZOHAN TRADERS</Text>
                  <Text color="#888" fontSize="9px" letterSpacing="2.5px">REFINED SALT</Text>
                </Box>
              </HStack>
            </a>
            <HStack gap={{ base: '3', md: '6' }} display={{ base: 'none', md: 'flex' }}>
              {[
                ['Home', '#dashboard'],
                ['Products', '#products'],
                ['Cartons', '#cartons'],
                ['Export', '#export'],
                ['Contact', '#contact'],
              ].map(([label, href]) => <a className="nav-link" key={label} href={href}>{label}</a>)}
            </HStack>
            <Box className="profile-area">
              <Button
                className="profile-trigger"
                variant="ghost"
                onClick={() => setProfileOpen((open) => !open)}
                aria-label="Open profile menu"
              >
                <Box className="profile-avatar">{initials}</Box>
                <Box className="profile-trigger-info">
                  <Text className="profile-name">{userName}</Text>
                  <Text className="profile-email">{userEmail}</Text>
                </Box>
                <Text className="profile-chevron">{profileOpen ? '⌃' : '⌄'}</Text>
              </Button>
              {profileOpen && (
                <Box className="profile-menu">
                  <Box className="profile-menu-head">
                    <Box className="profile-avatar profile-avatar-large">{initials}</Box>
                    <Box minW="0">
                      <Text color="white" fontWeight="700" fontSize="14px" noOfLines={1}>{userName}</Text>
                      <Text color="#777" fontSize="11px" noOfLines={1}>{userEmail}</Text>
                      {session.shop && <Text color="#d4af37" fontSize="10px" mt="1" noOfLines={1}>{session.shop}</Text>}
                    </Box>
                  </Box>
                  <Box className="profile-menu-divider" />
                  <Button
                    className="profile-logout"
                    onClick={() => {
                      localStorage.removeItem('zohan_traders_session');
                      window.location.reload();
                    }}
                  >
                    <Box className="profile-logout-icon">↪</Box>
                    <Text>Logout</Text>
                  </Button>
                </Box>
              )}
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box className="dashboard-main">
        <Box id="dashboard">
          <Dashboard />
        </Box>

        <Box id="products">
          <Container maxW="1200px" py={{ base: '80px', md: '110px' }}>
            <Flex justify="space-between" align={{ base: 'start', md: 'end' }} gap="6" mb="10" direction={{ base: 'column', md: 'row' }}>
              <VStack align="start" gap="3">
                <Text className="section-kicker">OUR PRODUCTS</Text>
                <Heading fontSize={{ base: '34px', md: '48px' }}>ZT ZAIQO Range</Heading>
              </VStack>
              <Text color="#777" maxW="390px" lineHeight="1.7">Choose the pouch size that fits your home or retail needs.</Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="6">
              {products.map((product) => (
                <Box className="product-card" key={product.size}>
                  <Flex justify="space-between" align="start">
                    <Text className="product-size">{product.size}</Text>
                    <Text className="product-tag">{product.tag}</Text>
                  </Flex>
                  <Heading size="md" mt="8">ZT ZAIQO</Heading>
                  <Text color="#d4af37" fontSize="13px" mt="2">REFINED IODIZED SALT</Text>
                  <Text color="#888" mt="5" lineHeight="1.7">{product.description}</Text>
                  <Box className="product-footer">
                    <Text color="#777" fontSize="12px">Premium everyday quality</Text>
                    <Text color="#d4af37">→</Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box id="cartons" className="carton-section">
          <Container maxW="1200px" py={{ base: '75px', md: '100px' }}>
            <VStack align="start" gap="4" mb="10">
              <Text className="section-kicker">CARTON PACKING</Text>
              <Heading fontSize={{ base: '36px', md: '50px' }}>Packing by pouch size.</Heading>
              <Text color="#999" maxW="680px" lineHeight="1.8">
                Each ZT ZAIQO pouch size has its own standard carton quantity. Scan the QR code printed on our carton to visit Zohan Traders and check the packing details.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="5">
              {cartonPacking.map((item) => (
                <Box className="carton-highlight" key={item.size}>
                  <VStack align="start" gap="2">
                    <Text className="carton-big">{item.pieces}</Text>
                    <Text color="#d4af37" fontWeight="800" letterSpacing="3px" fontSize="12px">PIECES PER CARTON</Text>
                    <Text color="white" fontWeight="800" fontSize="18px" mt="2">ZT ZAIQO {item.size}</Text>
                    <Text color="#777" fontSize="13px">Standard carton packing</Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
            <Text mt="5" color="#555" fontSize="11px" textAlign="center" w="full">
              400g = 48 Pieces per Carton • 600g / 700g / 800g = 24 Pieces per Carton
            </Text>
          </Container>
        </Box>

        <Box id="export" className="export-section">
          <Container maxW="1200px" py={{ base: '80px', md: '105px' }}>
            <Flex justify="space-between" align={{ base: 'start', md: 'end' }} gap="6" mb="10" direction={{ base: 'column', md: 'row' }}>
              <VStack align="start" gap="4">
                <Text className="section-kicker">EXPORT & BULK SUPPLY</Text>
                <Heading fontSize={{ base: '36px', md: '52px' }}>Packed for your market.</Heading>
                <Text color="#999" maxW="650px" lineHeight="1.8">
                  Zohan Traders supplies refined iodized salt for international and bulk buyers. Pouches, 25kg bags and 50kg bags are available according to customer demand and packaging requirements.
                </Text>
              </VStack>
                <AppLinkButton href="#contact" className="gold-button" size="lg">Request Export Quote</AppLinkButton>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="5">
              {exportOptions.map((item, index) => (
                <Box className="export-card" key={item.title}>
                  <Text className="export-card-number">0{index + 1}</Text>
                  <Heading size="md" mt="7">{item.title}</Heading>
                  <Text color="#d4af37" fontSize="12px" fontWeight="700" letterSpacing="1.5px" mt="3">{item.detail}</Text>
                  <Text color="#888" mt="5" lineHeight="1.7">{item.copy}</Text>
                </Box>
              ))}
            </SimpleGrid>
            <Box mt="8" className="export-note">
              <Text color="#aaa" fontSize="13px" lineHeight="1.8">
                <Box as="span" color="#d4af37" fontWeight="700">Export inquiries:</Box> Share your destination country, required quantity and preferred packing format with our team for a quotation.
              </Text>
            </Box>
          </Container>
        </Box>

        <Box id="contact" className="contact-section">
          <Container maxW="1200px" py={{ base: '75px', md: '95px' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="10" alignItems="center">
              <VStack align="start" gap="4">
                <Text className="section-kicker">CONTACT</Text>
                <Heading fontSize={{ base: '38px', md: '54px' }}>
                  Let’s build a<br />
                  <Box as="span" className="gold-text">trusted partnership.</Box>
                </Heading>
                <Text color="#999" maxW="520px" lineHeight="1.8">
                  For product inquiries, wholesale orders, export requirements and distribution opportunities, get in touch with Zohan Traders.
                </Text>
              </VStack>
              <Box className="contact-card">
                <Text color="#888" fontSize="12px" letterSpacing="2px">ZOHAN TRADERS</Text>
                <Text fontSize="20px" fontWeight="700" mt="3">Refined Salt Business</Text>
                <Text color="#999" mt="3">Hyderabad, Site Area, Pakistan</Text>
                <Box className="gold-rule" />
                <Text color="#d4af37" fontWeight="700">0313 3976670</Text>
                <Text color="#d4af37" fontWeight="700" mt="1">0309 7431271</Text>
                <a className="footer-link" href="mailto:zohantraders29@gmail.com" style={{ display: 'block', marginTop: '6px' }}>zohantraders29@gmail.com</a>
                <Box mt="6" w="full">
                  <AppLinkButton href="tel:+923133976670" className="gold-button">Call Us</AppLinkButton>
                </Box>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="footer" className="site-footer">
          <Container maxW="1200px" py={{ base: '55px', md: '65px' }}>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={{ base: '10', md: '8' }}>
              <VStack align="start" gap="4">
                <HStack gap="3">
                  <Box className="brand-mark">ZT</Box>
                  <Box>
                    <Text fontWeight="800" letterSpacing="2px" fontSize="14px">ZOHAN TRADERS</Text>
                    <Text color="#888" fontSize="9px" letterSpacing="2.5px">REFINED SALT</Text>
                  </Box>
                </HStack>
                <Text color="#777" fontSize="13px" lineHeight="1.8" maxW="270px">
                  Quality refined iodized salt, carefully packed for homes, retailers and growing businesses.
                </Text>
              </VStack>
              <VStack align="start" gap="3">
                <Text className="footer-heading">QUICK LINKS</Text>
                {[
                  ['Home', '#dashboard'],
                  ['Products', '#products'],
                  ['Cartons', '#cartons'],
                  ['Export', '#export'],
                  ['Contact', '#contact'],
                ].map(([label, href]) => <a className="footer-link" key={label} href={href}>{label}</a>)}
              </VStack>
              <VStack align="start" gap="3">
                <Text className="footer-heading">OUR BRAND</Text>
                <Text color="#d4af37" fontWeight="700">ZT ZAIQO</Text>
                <Text color="#777" fontSize="13px">Refined Iodized Salt</Text>
                <Text color="#777" fontSize="13px">400g • 600g • 700g • 800g</Text>
              </VStack>
              <VStack align="start" gap="3">
                <Text className="footer-heading">CONTACT</Text>
                <Text color="#999" fontSize="13px">📍 Hyderabad, Site Area, Pakistan</Text>
                <a className="footer-link" href="tel:+923133976670">0313 3976670</a>
                <a className="footer-link" href="tel:+923097431271">0309 7431271</a>
                <a className="footer-link" href="mailto:zohantraders29@gmail.com">zohantraders29@gmail.com</a>
              </VStack>
            </SimpleGrid>
            <Box className="footer-bottom">
              <Text color="#666" fontSize="12px">© 2026 Zohan Traders. All rights reserved.</Text>
              <Text color="#555" fontSize="11px" letterSpacing="1.5px">PURE • CLEAN • RELIABLE</Text>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
