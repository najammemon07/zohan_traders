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
    <Box minH="100vh" bg="#080808" color="white" display="flex" alignItems="center" py={{ base: '8', md: '12' }}>
      <Container maxW="1100px">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: '8', lg: '16' }} alignItems="center">
          <VStack align="start" gap="5" display={{ base: 'none', lg: 'flex' }}>
            <HStack gap="3">
              <Box className="brand-mark">ZT</Box>
              <Box>
                <Text fontWeight="800" letterSpacing="2px" fontSize="15px">ZOHAN TRADERS</Text>
                <Text color="#888" fontSize="9px" letterSpacing="2.5px">REFINED SALT</Text>
              </Box>
            </HStack>
            <Heading fontSize="58px" lineHeight="1.03" mt="5">Welcome to <Box as="span" className="gold-text">ZT ZAIQO.</Box></Heading>
            <Text color="#999" fontSize="17px" lineHeight="1.8" maxW="500px">Register your shop once to access Zohan Traders products, carton information and wholesale contact details.</Text>
            <HStack gap="8" pt="3">
              <VStack align="start"><Text color="#d4af37" fontWeight="800" fontSize="22px">600g</Text><Text color="#666" fontSize="11px">POUCH</Text></VStack>
              <VStack align="start"><Text color="#d4af37" fontWeight="800" fontSize="22px">700g</Text><Text color="#666" fontSize="11px">POUCH</Text></VStack>
              <VStack align="start"><Text color="#d4af37" fontWeight="800" fontSize="22px">800g</Text><Text color="#666" fontSize="11px">POUCH</Text></VStack>
            </HStack>
          </VStack>

          <Box bg="#111" border="1px solid rgba(212,175,55,.2)" borderRadius="24px" p={{ base: '6', md: '9' }} boxShadow="0 30px 80px rgba(0,0,0,.35)">
            <VStack align="stretch" gap="6">
              <Box>
                <Text className="section-kicker">CUSTOMER PORTAL</Text>
                <Heading mt="2" fontSize="32px">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</Heading>
                <Text color="#777" mt="2" fontSize="14px">{mode === 'signup' ? 'Register first, then you will enter the website automatically.' : 'Sign in to continue to Zohan Traders.'}</Text>
              </Box>

              <HStack bg="#080808" p="1" borderRadius="12px">
                <Button flex="1" variant="ghost" color={mode === 'signup' ? '#d4af37' : '#777'} onClick={() => { setMode('signup'); setError(''); }}>Sign Up</Button>
                <Button flex="1" variant="ghost" color={mode === 'signin' ? '#d4af37' : '#777'} onClick={() => { setMode('signin'); setError(''); }}>Sign In</Button>
              </HStack>

              <Box as="form" onSubmit={submit}>
                <VStack align="stretch" gap="4">
                  {mode === 'signup' && <>
                    <Field.Root required>
                      <Field.Label color="#aaa">Full Name</Field.Label>
                      <Input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" bg="#080808" borderColor="#2b2b2b" />
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label color="#aaa">Shop / Business Name</Field.Label>
                      <Input value={form.shop} onChange={(e) => update('shop', e.target.value)} placeholder="Your shop name" bg="#080808" borderColor="#2b2b2b" />
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label color="#aaa">Phone Number</Field.Label>
                      <Input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="03XX XXXXXXX" bg="#080808" borderColor="#2b2b2b" />
                    </Field.Root>
                  </>}
                  <Field.Root required>
                    <Field.Label color="#aaa">Email</Field.Label>
                    <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" bg="#080808" borderColor="#2b2b2b" />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label color="#aaa">Password</Field.Label>
                    <Input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Minimum 6 characters" bg="#080808" borderColor="#2b2b2b" />
                  </Field.Root>

                  {error && <Text color="#e57373" fontSize="13px">{error}</Text>}
                  <Button type="submit" className="gold-button" size="lg" w="full">
                    {mode === 'signup' ? 'Create Account & Continue' : 'Sign In & Continue'}
                  </Button>
                </VStack>
              </Box>

              <Text color="#555" fontSize="11px" lineHeight="1.6">By continuing, you agree to use this customer portal for Zohan Traders business communication.</Text>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
