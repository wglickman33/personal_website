export type DeckId = string;

export type ApiCard = {
  code: string;
  image: string;
  images?: { svg?: string; png?: string };
  value: string;
  suit: string;
};

export type NewDeckResponse = {
  success: boolean;
  deck_id: DeckId;
  shuffled: boolean;
  remaining: number;
};

export type DrawResponse = {
  success: boolean;
  deck_id: DeckId;
  cards: ApiCard[];
  remaining: number;
};

const DEFAULT_BASE = 'https://deckofcardsapi.com';

function baseUrl() {
  return import.meta.env.VITE_DECK_API_BASE || DEFAULT_BASE;
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`);
  if (!res.ok) throw new Error(`Deck API error: ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

export async function newShuffledDeck(deckCount: number = 6): Promise<NewDeckResponse> {
  return await getJson<NewDeckResponse>(`/api/deck/new/shuffle/?deck_count=${deckCount}`);
}

export async function drawCards(deckId: DeckId, count: number): Promise<DrawResponse> {
  return await getJson<DrawResponse>(`/api/deck/${deckId}/draw/?count=${count}`);
}

