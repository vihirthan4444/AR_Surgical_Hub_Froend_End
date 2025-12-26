
import { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#' },
  {
    label: 'OUR PRODUCTS',
    href: '#',
    children: [
      { label: 'Surgical Instruments', href: '#' },
      { label: 'General Equipment', href: '#' },
      { label: 'Specialized Instruments', href: '#' },
    ]
  },
  { label: 'ABOUT US', href: '#' },
  { label: 'OUR SERVICES', href: '#' },
  { label: 'CONTACT US', href: '#' },
  { label: 'AR CAREERS', href: '#' },
];
