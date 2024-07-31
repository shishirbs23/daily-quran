import { Translation } from "./Translation";
import { Transliteration } from "./Transliteration";

export interface Word {
    id: number;
    position: number;
    audio_url?: string;
    char_type_name: string;
    text_uthmani: string;
    page_number: number;
    line_number: number;
    text: string;
    translation: Translation;
    transliteration: Transliteration;
}