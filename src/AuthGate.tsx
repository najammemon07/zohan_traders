import { FormEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import App from './App';

type User = {
  name: string;
  shop: string;
  phone: string;
  email: string;
  password: string;
};

const USERS_KEY = 'zohan_traders_users';
const SESSION_KEY = 'zohan_traders_session';

function readUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as User[];
  } catch {
    return [];
  }
}

export default function AuthGate() {
  const [authenticated, setAuthenticated] = useState(false);
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', shop: '', phone: '', email: '', password: '' });

  useEffect(() => {
    setAuthenticated(Boolean(localStorage.getItem(SESSION_KEY)));
  }, []);

  if (authenticated) return <App />;

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError('');
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const users = readUsers();

    if (!email || !password) {
      setError('Email aur password zaroor enter karein.');
      return;
    }

    if (mode === 'signup') {
      if (!form.name.trim() || !form.shop.trim() || !form.phone.trim()) {
        setError('Name, shop name aur phone number required hain.');
        return;
      }
      if (password.length < 6) {
        setError('Password kam az kam 6 characters ka hona chahiye.');
        return;
      }
      if (users.some((user) => user.email === email)) {
        setError('Is email se account already registered hai. Sign In karein.');
        return;
      }

      const user: User = {
        name: form.name.trim(),
        shop: form.shop.trim(),
        phone: form.phone.trim(),
        email,
        password,
      };
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, name: user.name, shop: user.shop }));
      setAuthenticated(true);
      return;
    }

    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) {
      setError('Email ya password incorrect hai.');
      return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, name: user.name, shop: user.shop }));
    setAuthenticated(true);
  };

  return (
    <Box minH="100vh" bg="#080808" color="white" display="flex" alignItems="center" py={{ base: '4', md: '6' }}>
      <Container maxW="1100px">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: '6', lg: '12' }} alignItems="center">
          <VStack align="start" gap="4" display={{ base: 'none', lg: 'flex' }}>
            <HStack gap="3">
              <Box className="brand-mark">ZT</Box>
              <Box>
                <Text fontWeight="800" letterSpacing="2px" fontSize="15px">ZOHAN TRADERS</Text>
                <Text color="#888" fontSize="9px" letterSpacing="2.5px">REFINED SALT</Text>
              </Box>
            </HStack>
            <Heading fontSize="52px" lineHeight="1.03" mt="3">Welcome to <Box as="span" className="gold-text">ZT ZAIQO.</Box></Heading>
            <Text color="#999" fontSize="16px" lineHeight="1.7" maxW="500px">Register your shop once to access Zohan Traders products, carton information and wholesale contact details.</Text>
            <HStack gap="7" pt="1">
              <VStack align="start"><Text color="#d4af37" fontWeight="800" fontSize="20px">600g</Text><Text color="#666" fontSize="10px">POUCH</Text></VStack>
              <VStack align="start"><Text color="#d4af37" fontWeight="800" fontSize="20px">700g</Text><Text color="#666" fontSize="10px">POUCH</Text></VStack>
              <VStack align="start"><Text color="#d4af37" fontWeight="800" fontSize="20px">800g</Text><Text color="#666" fontSize="10px">POUCH</Text></VStack>
            </HStack>
          </VStack>

          <Box bg="#111" border="1px solid rgba(212,175,55,.2)" borderRadius="20px" p={{ base: '5', md: '6' }} boxShadow="0 25px 65px rgba(0,0,0,.35)">
            <VStack align="stretch" gap="4">
              <Box>
                <Text className="section-kicker">CUSTOMER PORTAL</Text>
                <Heading mt="1" fontSize="28px">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</Heading>
                <Text color="#777" mt="1" fontSize="13px">{mode === 'signup' ? 'Register first, then you will enter the website automatically.' : 'Sign in to continue to Zohan Traders.'}</Text>
              </Box>

              <HStack bg="#080808" p="1" borderRadius="10px">
                <Button flex="1" size="sm" variant="ghost" color={mode === 'signup' ? '#d4af37' : '#777'} onClick={() => { setMode('signup'); setError(''); }}>Sign Up</Button>
                <Button flex="1" size="sm" variant="ghost" color={mode === 'signin' ? '#d4af37' : '#777'} onClick={() => { setMode('signin'); setError(''); }}>Sign In</Button>
              </HStack>

              <Box as="form" onSubmit={submit}>
                <VStack align="stretch" gap="2.5">
                  {mode === 'signup' && <>
                    <Field.Root required>
                      <Field.Label color="#aaa" fontSize="13px" mb="1">Full Name</Field.Label>
                      <Input size="sm" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" bg="#080808" borderColor="#2b2b2b" />
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label color="#aaa" fontSize="13px" mb="1">Shop / Business Name</Field.Label>
                      <Input size="sm" value={form.shop} onChange={(e) => update('shop', e.target.value)} placeholder="Your shop name" bg="#080808" borderColor="#2b2b2b" />
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label color="#aaa" fontSize="13px" mb="1">Phone Number</Field.Label>
                      <Input size="sm" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="03XX XXXXXXX" bg="#080808" borderColor="#2b2b2b" />
                    </Field.Root>
                  </>}
                  <Field.Root required>
                    <Field.Label color="#aaa" fontSize="13px" mb="1">Email</Field.Label>
                    <Input size="sm" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" bg="#080808" borderColor="#2b2b2b" />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label color="#aaa" fontSize="13px" mb="1">Password</Field.Label>
                    <Input size="sm" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Minimum 6 characters" bg="#080808" borderColor="#2b2b2b" />
                  </Field.Root>

                  {error && <Text color="#e57373" fontSize="12px">{error}</Text>}
                  <Button type="submit" className="gold-button" size="md" w="full" mt="1">
                    {mode === 'signup' ? 'Create Account & Continue' : 'Sign In & Continue'}
                  </Button>
                </VStack>
              </Box>

              <Text color="#555" fontSize="10px" lineHeight="1.5">By continuing, you agree to use this customer portal for Zohan Traders business communication.</Text>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
