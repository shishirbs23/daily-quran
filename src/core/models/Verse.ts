import { Word } from "./Word";

export interface Verse {
    id: number;
    verse_number: number;
    verse_key: string;
    hizb_number: number;
    rub_el_hizb_number: number;
    ruku_number: number;
    manzil_number: number;
    sajdah_number: number;
    text_uthmani: string;
    chapter_id: number;
    page_number: number;
    juz_number: number;
    words: Word[];
}