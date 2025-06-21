import { ulid } from 'ulidx';
import type { HeaderRows } from '@/interfaces';

export const tariffHeaderRows: Array<HeaderRows> = [
  { id: ulid(), name: 'Utility', align: 'left' },
  { id: ulid(), name: 'Name', align: 'left' },
  { id: ulid(), name: 'Code', align: 'left' },
  { id: ulid(), name: 'Type', align: 'left' },
  { id: ulid(), name: 'Effective', align: 'left' },
];

export const utilityRows: Array<HeaderRows> = [
  { id: ulid(), name: 'Energy Provider', align: 'left' },
  { id: ulid(), name: 'Short Name', align: 'left' },
  { id: ulid(), name: 'Website', align: 'left' },
  { id: ulid(), name: 'Customers', align: 'center' },
];
