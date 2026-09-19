import { useMemo, useState } from 'react';
import { Box, Button, Flex, Heading, HStack, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';

type Entry = { label: string; value: number };

const initialSales: Entry[] = [
  { label: 'Apr', value: 185000 }, { label: 'May', value: 224000 },
  { label: 'Jun', value: 276000 }, { label: 'Jul', value: 318000 },
  { label: 'Aug', value: 362000 }, { label: 'Sep', value: 410000 },
];

const initialPurchases: Entry[] = [
  { label: 'Apr', value: 118000 }, { label: 'May', value: 142000 },
  { label: 'Jun', value: 176000 }, { label: 'Jul', value: 194000 },
  { label: 'Aug', value: 221000 }, { label: 'Sep', value: 248000 },
];

const initialExpenses: Entry[] = [
  { label: 'Apr', value: 24000 }, { label: 'May', value: 29000 },
  { label: 'Jun', value: 31000 }, { label: 'Jul', value: 35000 },
  { label: 'Aug', value: 39000 }, { label: 'Sep', value: 42000 },
];

const money = (value: number) => `Rs. ${value.toLocaleString('en-PK')}`;

function BarChart({ data, title }: { data: Entry[]; title: string }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <Box className="dashboard-chart">
      <Text color="#888" fontSize="12px" letterSpacing="1.5px" fontWeight="700">{title}</Text>
      <Flex align="end" gap={{ base: '2', md: '4' }} h="210px" mt="6">
        {data.map((item) => (
          <VStack key={item.label} flex="1" h="full" justify="end" gap="2">
            <Text fontSize="10px" color="#aaa">{money(item.value).replace('Rs. ', '')}</Text>
            <Box w="full" maxW="42px" h={`${Math.max((item.value / max) * 145, 8)}px`} borderRadius="5px 5px 0 0" bg="#d4af37" />
            <Text fontSize="10px" color="#666">{item.label}</Text>
          </VStack>
        ))}
      </Flex>
    </Box>
  );
}

export default function Dashboard() {
  const [sales, setSales] = useState(initialSales);
  const [purchases, setPurchases] = useState(initialPurchases);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'sale', month: 'Sep', amount: '' });

  const totals = useMemo(() => {
    const sale = sales.reduce((sum, item) => sum + item.value, 0);
    const purchase = purchases.reduce((sum, item) => sum + item.value, 0);
    const expense = expenses.reduce((sum, item) => sum + item.value, 0);
    return { sale, purchase, expense, profit: sale - purchase - expense };
  }, [sales, purchases, expenses]);

  const addEntry = () => {
    const amount = Number(form.amount);
    if (!amount || amount < 0) return;
    const entry = { label: form.month, value: amount };
    if (form.type === 'sale') setSales((items) => [...items, entry]);
    if (form.type === 'purchase') setPurchases((items) => [...items, entry]);
    if (form.type === 'expense') setExpenses((items) => [...items, entry]);
    setForm({ ...form, amount: '' });
    setShowForm(false);
  };

  const cards = [
    ['Total Sales', totals.sale, 'dashboard-card sales'],
    ['Total Purchases', totals.purchase, 'dashboard-card purchases'],
    ['Total Expenses', totals.expense, 'dashboard-card expenses'],
    ['Net Profit / Loss', totals.profit, 'dashboard-card profit'],
  ];

  return (
    <Box id="dashboard" className="dashboard-section">
      <Box className="dashboard-wrap">
        <Flex justify="space-between" align={{ base: 'start', md: 'center' }} gap="5" direction={{ base: 'column', md: 'row' }} mb="8">
          <VStack align="start" gap="2">
            <Text className="section-kicker">BUSINESS DASHBOARD</Text>
            <Heading fontSize={{ base: '34px', md: '48px' }}>Zohan Traders Overview</Heading>
            <Text color="#777" fontSize="13px">Sales, purchases, expenses and profitability at a glance.</Text>
          </VStack>
          <Button className="gold-button" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close Entry' : '+ Add Entry'}</Button>
        </Flex>

        {showForm && (
          <Box className="dashboard-form" mb="6">
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="3">
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="dashboard-select">
                <option value="sale">Sales</option><option value="purchase">Purchase</option><option value="expense">Expense</option>
              </select>
              <Input value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} placeholder="Month / label" />
              <HStack><Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Amount in PKR" /><Button onClick={addEntry} className="gold-button">Save</Button></HStack>
            </SimpleGrid>
          </Box>
        )}

        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="4" mb="6">
          {cards.map(([title, value, cls]) => (
            <Box className={String(cls)} key={String(title)}>
              <Text color="#777" fontSize="11px" letterSpacing="1.5px" fontWeight="700">{title}</Text>
              <Text fontSize={{ base: '24px', md: '29px' }} fontWeight="800" mt="3">{money(Number(value))}</Text>
              <Text color="#555" fontSize="10px" mt="2">All recorded periods</Text>
            </Box>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="5">
          <BarChart data={sales} title="SALES TREND" />
          <BarChart data={purchases} title="PURCHASE TREND" />
          <BarChart data={expenses} title="EXPENSE TREND" />
          <Box className="dashboard-chart">
            <Text color="#888" fontSize="12px" letterSpacing="1.5px" fontWeight="700">PROFIT & LOSS</Text>
            <VStack align="stretch" gap="5" mt="7">
              {[
                ['Revenue / Sales', totals.sale],
                ['Purchases', -totals.purchase],
                ['Expenses', -totals.expense],
                ['Net Profit / Loss', totals.profit],
              ].map(([label, value]) => (
                <Flex key={String(label)} justify="space-between" borderBottom="1px solid #202020" pb="4">
                  <Text color="#aaa" fontSize="13px">{label}</Text>
                  <Text fontWeight="800" color={Number(value) < 0 ? '#e57373' : '#d4af37'}>{money(Math.abs(Number(value)))}{Number(value) < 0 ? ' −' : ''}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
