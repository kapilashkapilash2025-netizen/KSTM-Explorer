import { EmergencyContact } from '@/lib/types';

export const emergencyContacts: EmergencyContact[] = [
  {
    id: 'e1',
    title: 'General Emergency / Ambulance',
    description: 'For all general medical emergencies and ambulance services.',
    phone: '110',
    type: 'Medical',
  },
  {
    id: 'e2',
    title: 'Police',
    description: 'For general police assistance and reporting crimes.',
    phone: '119',
    type: 'Police',
  },
  {
    id: 'e3',
    title: 'Fire Brigade',
    description: 'For fire emergencies and rescue operations.',
    phone: '111',
    type: 'Hotline',
  },
  {
    id: 'e4',
    title: 'Tourist Police Hotline',
    description: 'Specialized police unit dedicated to assisting tourists in Sri Lanka.',
    phone: '+94 11 242 1000',
    type: 'Specialized',
  },
  {
    id: 'e5',
    title: 'Women Help Line',
    description: 'Dedicated support and emergency assistance for women.',
    phone: '+94 11 268 811',
    type: 'Specialized',
  },
  {
    id: 'e6',
    title: 'Disaster Management',
    description: 'For natural disasters, floods, landslides, and extreme weather emergencies.',
    phone: '+94 11 213 6136',
    type: 'Specialized',
  },
  {
    id: 'e7',
    title: 'Coast Guard',
    description: 'For marine emergencies, water safety, and coastal incidents.',
    phone: '+94 11 238 641',
    type: 'Specialized',
  }
];
