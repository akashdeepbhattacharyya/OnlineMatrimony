import { Option } from '@/resources/form';
import { Religion } from './religion';

export const hinduCastes = {
  GENERAL: 'General',
  OBC: 'OBC',
  SC: 'SC',
  ST: 'ST',
  OTHER: 'Other',
};
export type HinduCaste = keyof typeof hinduCastes;

export const hinduCasteOptions: Option<HinduCaste>[] = Object.entries(hinduCastes).map(
  ([key, value]) => ({
    label: value,
    value: key as HinduCaste,
  }),
);

export const generalSubCastes = {
  BRAMHIN: 'Brahmin',
  KSHATRIYA: 'Kshatriya',
  VAISHYA: 'Vaishya',
  SHUDRA: 'Shudra',
};

export type GeneralSubCaste = keyof typeof generalSubCastes;

export const generalSubCasteOptions: Option<GeneralSubCaste>[] = Object.entries(generalSubCastes).map(
  ([key, value]) => ({
    label: value,
    value: key as GeneralSubCaste,
  }),
);

export const muslimCastes = {
  SUNNI: 'Sunni',
  SHIA: 'Shia',
  AHMEDIYA: 'Ahmadiya',
  BOHRA: 'Bohra',
};

export const muslimCasteOptions: Option<MuslimCaste>[] = Object.entries(muslimCastes).map(
  ([key, value]) => ({
    label: value,
    value: key as MuslimCaste,
  }),
);

export type MuslimCaste = keyof typeof muslimCastes;

export const christianCastes = {
  CATHOLIC: 'Catholic',
  PROTESTANT: 'Protestant',
  ORTHODOX: 'Orthodox',
};

export type ChristianCaste = keyof typeof christianCastes;

export const christianCasteOptions: Option<ChristianCaste>[] = Object.entries(christianCastes).map(
  ([key, value]) => ({
    label: value,
    value: key as ChristianCaste,
  }),
);

export const sikhCastes = {
  JATT: 'Jatt',
  SANDHU: 'Sandhu',
  MALIK: 'Malik',
  KHALSA: 'Khalsa',
};

export type SikhCaste = keyof typeof sikhCastes;

export const sikhCasteOptions: Option<SikhCaste>[] = Object.entries(sikhCastes).map(
  ([key, value]) => ({
    label: value,
    value: key as SikhCaste,
  }),
);

export const buddhistCastes = {
  THERAVADA: 'Theravada',
  MAHAYANA: 'Mahayana',
  VAJRAYANA: 'Vajrayana',
};

export type BuddhistCaste = keyof typeof buddhistCastes;

export const buddhistCasteOptions: Option<BuddhistCaste>[] = Object.entries(buddhistCastes).map(
  ([key, value]) => ({
    label: value,
    value: key as BuddhistCaste,
  }),
);

export const jainCastes = {
  DIGAMBAR: 'Digambar',
  SHWETAMBAR: 'Shwetambar',
};

export type JainCaste = keyof typeof jainCastes;

export const jainCasteOptions: Option<JainCaste>[] = Object.entries(jainCastes).map(
  ([key, value]) => ({
    label: value,
    value: key as JainCaste,
  }),
);

export const parsiCastes = {
  KADMI: 'Kadmi',
  SHAHENSHAHI: 'Shahenshahi',
  IRANI_ZOROASTRIANS: 'Irani Zoroastrians',
};

export type ParsiCaste = keyof typeof parsiCastes;

export const parsiCasteOptions: Option<ParsiCaste>[] = Object.entries(parsiCastes).map(
  ([key, value]) => ({
    label: value,
    value: key as ParsiCaste,
  }),
);

export const castes = {
  ...hinduCastes,
  ...muslimCastes,
  ...christianCastes,
  ...sikhCastes,
  ...buddhistCastes,
  ...jainCastes,
  ...parsiCastes,
};

export const subCastes = {
  ...generalSubCastes,
};

export const casteOptions = (religions: Religion[]): Option<Caste>[] => {
  return religions.flatMap(religion => getCasteOptions(religion))
    .sort((a, b) => {
      if (a.value === 'OTHER') return 1; // Move 'OTHER' to the end
      if (b.value === 'OTHER') return -1; // Move 'OTHER' to the end
      return a.label.localeCompare(b.label); // Sort alphabetically
    });
};

export const subCasteOptions = (castes: Caste[]): Option<SubCaste>[] => {
  return castes.flatMap(caste => getSubCasteOptions(caste));
};

export type Caste = HinduCaste | MuslimCaste | ChristianCaste | SikhCaste | BuddhistCaste | JainCaste | ParsiCaste;

export type SubCaste = GeneralSubCaste;

export function getCasteOptions(religion?: Religion): Option<Caste>[] {
  switch (religion) {
    case 'HINDU':
      return hinduCasteOptions;
    case 'MUSLIM':
      return muslimCasteOptions;
    case 'CHRISTIAN':
      return christianCasteOptions;
    case 'SIKH':
      return sikhCasteOptions;
    case 'BUDDHIST':
      return buddhistCasteOptions;
    case 'JAIN':
      return jainCasteOptions;
    case 'PARSI':
      return parsiCasteOptions;
    default:
      return [];
  }
}

export function getSubCasteOptions(caste?: Caste): Option<SubCaste>[] {
  switch (caste) {
    case 'GENERAL':
      return generalSubCasteOptions;
    default:
      return [];
  }
}