export interface Reciter {
  id: number;
  reciter_id: number;
  name: string;
  translated_name: TranslatedName;
  style: Style;
  qirat: Qirat;
}

export interface TranslatedName {
  name: string;
  language_name: string;
}

export interface Style {
  name: string;
  language_name: string;
  description: string;
}

export interface Qirat {
  name: string;
  language_name: string;
}
