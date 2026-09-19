import { useMemo, useState } from 'react';
import { Box, Button, Flex, Heading, HStack, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';

type Type = 'sale' | 'purchase' | 'expense';
type Entry = { id: number; type: Type; label: string; amount: number };

const seed: Entry[] = [
  { id: 1, type: 'sale', label: 'Apr', amount: 185000 }, { id: 2, type: 'sale', label: 'May', amount: 224000 },
  { id: 3, type: 'sale', label: 'Jun', amount: 276000 }, { id: 4, type: 'sale', label: 'Jul', amount: 318000 },
  { id: 5, type: 'sale', label: 'Aug', amount: 362000 }, { id: 6, type: 'sale', label: 'Sep', amount: 410000 },
  { id: 7, type: 'purchase', label: 'Apr', amount: 118000 }, { id: 8, type: 'purchase', label: 'May', amount: 142000 },
  { id: 9, type: 'purchase', label: 'Jun', amount: 176000 }, { id: 10, type: 'purchase', label: 'Jul', amount: 194000 },
  { id: 11, type: 'purchase', label: 'Aug', amount: 221000 }, { id: 12, type: 'purchase', label: 'Sep', amount: 248000 },
  { id: 13, type: 'expense', label: 'Apr', amount: 24000 }, { id: 14, type: 'expense', label: 'May', amount: 29000 },
  { id: 15, type: 'expense', label: 'Jun', amount: 31000 }, { id: 16, type: 'expense', label: 'Jul', amount: 35000 },
  { id: 17, type: 'expense', label: 'Aug', amount: 39000 }, { id: 18, type: 'expense', label: 'Sep', amount: 42000 },
];

const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const money = (v: number) => `Rs. ${v.toLocaleString('en-PK')}`;

function MiniChart({ data, title, type = 'bar' }: { data: { label: string; value: number }[]; title: string; type?: 'bar' | 'line' }) {
  const max = Math.max(...data.map(x => Math.abs(x.value)), 1);
  return <Box className="dashboard-chart">
    <Flex justify="space-between" align="center"><Text color="#888" fontSize="11px" letterSpacing="1.5px" fontWeight="700">{title}</Text><Text color="#555" fontSize="10px">PKR</Text></Flex>
    <Flex align="end" gap={{ base: '2', md: '4' }} h="205px" mt="5">
      {data.map((item, i) => <VStack key={`${item.label}-${i}`} flex="1" h="full" justify="end" gap="2">
        <Text fontSize="9px" color="#aaa">{Math.round(item.value / 1000)}k</Text>
        <Box w="full" maxW="46px" h={`${Math.max((Math.abs(item.value) / max) * 145, 7)}px`} borderRadius="5px 5px 0 0" bg={type === 'line' ? '#b9952d' : '#d4af37'} opacity={type === 'line' ? .7 + i / 20 : 1} />
        <Text fontSize="10px" color="#666">{item.label}</Text>
      </VStack>)}
    </Flex>
  </Box>;
}

export default function Dashboard() {
  const [entries, setEntries] = useState<Entry[]>(seed);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{ type: Type; label: string; amount: string }>({ type: 'sale', label: 'Sep', amount: '' });

  const totals = useMemo(() => entries.reduce((a, e) => {
    a[e.type] += e.amount;
    return a;
  }, { sale: 0, purchase: 0, expense: 0 }), [entries]);

  const profit = totals.sale - totals.purchase - totals.expense;

  const byMonth = (type: Type) => months.map(label => ({
    label,
    value: entries.filter(e => e.type === type && e.label === label).reduce((s, e) => s + e.amount, 0),
  }));

  const profitTrend = months.map(label => {
    const s = byMonth('sale').find(x => x.label === label)?.value || 0;
    const p = byMonth('purchase').find(x => x.label === label)?.value || 0;
    const e = byMonth('expense').find(x => x.label === label)?.value || 0;
    return { label, value: s - p - e };
  });

  const addEntry = () => {
    const amount = Number(form.amount);
    if (!amount || amount < 0) return;
    setEntries(current => [...current, { id: Date.now(), type: form.type, label: form.label.trim() || 'Other', amount }]);
    setForm(current => ({ ...current, amount: '' }));
    setShowForm(false);
  };

  const cards = [
    ['Total Sales', totals.sale, 'sales'],
    ['Total Purchases', totals.purchase, 'purchases'],
    ['Total Expenses', totals.expense, 'expenses'],
    ['Net Profit / Loss', profit, 'profit'],
  ] as const;

  return <Box id="dashboard" className="dashboard-section">
    <Box className="dashboard-wrap">
      <Flex justify="space-between" align={{ base: 'start', md: 'center' }} gap="5" direction={{ base: 'column', md: 'row' }} mb="8">
        <VStack align="start" gap="2">
          <Text className="section-kicker">BUSINESS DASHBOARD</Text>
          <Heading fontSize={{ base: '32px', md: '46px' }}>Zohan Traders Overview</Heading>
          <Text color="#777" fontSize="13px">Track sales, purchases, expenses and profitability in one place.</Text>
        </VStack>
        <Button className="gold-button" onClick={() => setShowForm(v => !v)}>{showForm ? 'Close Entry' : '+ Add Entry'}</Button>
      </Flex>

      {showForm && <Box className="dashboard-form" mb="6">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="3">
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Type })} className="dashboard-select">
            <option value="sale">Sales</option><option value="purchase">Purchase</option><option value="expense">Expense</option>
          </select>
          <select value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} className="dashboard-select">
            {months.map(m => <option key={m}>{m}</option>)}<option value="Other">Other</option>
          </select>
          <HStack><Input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="Amount in PKR" /><Button onClick={addEntry} className="gold-button">Save</Button></HStack>
        </SimpleGrid>
      </Box>}

      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="4" mb="6">
        {cards.map(([title, value, cls]) => <Box className={`dashboard-card ${cls}`} key={title}>
          <Text color="#777" fontSize="11px" letterSpacing="1.5px" fontWeight="700">{title}</Text>
          <Text fontSize={{ base: '24px', md: '29px' }} fontWeight="800" mt="3" color={cls === 'profit' && value < 0 ? '#e57373' : 'white'}>{money(value)}</Text>
          <Text color="#555" fontSize="10px" mt="2">All recorded periods</Text>
        </Box>)}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="5">
        <MiniChart data={byMonth('sale')} title="SALES TREND" />
        <MiniChart data={byMonth('purchase')} title="PURCHASE TREND" />
        <MiniChart data={byMonth('expense')} title="EXPENSE TREND" />
        <MiniChart data={profitTrend} title="MONTHLY PROFIT / LOSS" type="line" />
      </SimpleGrid>

      <Box className="dashboard-chart" mt="5">
        <Flex justify="space-between" align="center" mb="5"><Text color="#888" fontSize="11px" letterSpacing="1.5px" fontWeight="700">PROFIT & LOSS SUMMARY</Text><Text color={profit >= 0 ? '#d4af37' : '#e57373'} fontWeight="800">{profit >= 0 ? 'PROFIT' : 'LOSS'}</Text></Flex>
        <SimpleGrid columns={{ base: 1, md: 4 }} gap="4">
          {[['Revenue / Sales', totals.sale], ['Purchases', totals.purchase], ['Expenses', totals.expense], ['Net Profit / Loss', profit]].map(([label, value]) =>
            <Box key={String(label)} border="1px solid #202020" borderRadius="10px" p="4">
              <Text color="#777" fontSize="11px">{label}</Text><Text mt="2" fontWeight="800" color={Number(value) < 0 ? '#e57373' : '#ddd'}>{money(Number(value))}</Text>
            </Box>
          )}
        </SimpleGrid>
      </Box>

      <Box className="dashboard-chart" mt="5">
        <Flex justify="space-between" align="center" mb="5"><Text color="#888" fontSize="11px" letterSpacing="1.5px" fontWeight="700">RECENT ENTRIES</Text><Text color="#555" fontSize="10px">{entries.length} entries</Text></Flex>
        <VStack align="stretch" gap="0">
          {entries.slice(-8).reverse().map(e => <Flex key={e.id} justify="space-between" align="center" py="3" borderBottom="1px solid #1c1c1c">
            <HStack><Box w="7px" h="7px" borderRadius="full" bg={e.type === 'sale' ? '#d4af37' : e.type === 'purchase' ? '#777' : '#9b6b55'} /><Text fontSize="13px" color="#bbb">{e.type === 'sale' ? 'Sale' : e.type === 'purchase' ? 'Purchase' : 'Expense'} • {e.label}</Text></HStack>
            <Text fontWeight="700" fontSize="13px">{money(e.amount)}</Text>
          </Flex>)}
        </VStack>
      </Box>
    </Box>
  </Box>;
}
