import "./App.css";
import React, { useCallback, useEffect, useState } from "react";

const fruits = [
  "Abiu",
  "Acaí",
  "Acerola",
  "Akebi",
  "Ackee",
  "African Cherry Orange",
  "American Mayapple",
  "Apple",
  "Apricot",
  "Araza",
  "Avocado",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Black sapote",
  "Blueberry",
  "Boysenberry",
  "Breadfruit",
  "Buddha's hand",
  "Cactus pear",
  "Canistelt",
  "Cempedak",
  "Cherimoya",
  "Cherry",
  "Chico fruit",
  "Cloudberry",
  "Coco de mer",
  "Coconut",
  "Crab apple",
  "Cranberry",
  "Currant",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Finger Lime",
  "Goji berry",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Grewia asiatica",
  "Guava",
  "Hala Fruit",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Japanese plum",
  "Jostaberry",
  "Jujube",
  "Juniper berry",
  "Kaffir Lime",
  "Kiwano",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loganberry",
  "Longan",
  "Loquat",
  "Lulo",
  "Lychee",
  "Magellan Barberry",
  "Mamey Apple",
  "Mamey Sapote",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Galia melon",
  "Honeydew",
  "Mouse melon",
  "Musk melon",
  "Watermelon",
  "Miracle fruit",
  "Momordica fruit",
  "Monstera deliciosa",
  "Mulberry",
  "Nance",
  "Nectarine",
  "Orange",
  "Blood orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Pawpaw",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Prune",
  "Pineapple",
  "Pineberry",
  "Plumcot",
  "Pomegranate",
  "Pomelo",
  "Purple mangosteen",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Rose apple",
  "Salal berry",
  "Salak",
  "Sapodilla",
  "Sapote",
  "Satsuma",
  "Soursop",
  "Star apple",
  "Star fruit",
  "Strawberry",
  "Surinam cherry",
  "Tamarillo",
  "Tamarind",
  "Tangelo",
  "Tayberry",
  "Ugli fruit",
  "White currant",
  "White sapote",
  "Ximenia",
  "Yuzu",
];

async function getAutocompleteResults(query: string, signal?: AbortSignal): Promise<string[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // if the request was aborted after it was started, `reject`
      if (signal?.aborted) {
        reject(signal.reason);
      }
      resolve(fruits.filter((fruit) => fruit.toLowerCase().includes(query.toLowerCase())));
    }, Math.random() * 1000);
  });
}

type Fn = (...args: any[]) => void;

function debounce<F extends Fn>(f: F, delay: number): F {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: any, ...args: any[]) {
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => f.apply(context, args), delay);
  } as F;
}

const MySolution: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const cb = useCallback(
    debounce((query: string) => {
      console.log("Called:", query);
      if (!query) {
        setIsLoading(false);
        setResults([]);
        return;
      }
      getAutocompleteResults(query).then((r) => {
        setResults(r);
        setIsLoading(false);
      });
    }, 250),
    [setResults],
  );

  useEffect(() => {
    setIsLoading(true);
    cb(query);
  }, [query]);

  return (
    <div>
      <div>
        <input onChange={(e) => setQuery(e.target.value)} />
        {isLoading && <span>Loading...</span>}
      </div>
      <div>
        {results.map((fruit) => (
          <div key={fruit}>{fruit}</div>
        ))}
      </div>
    </div>
  );
};

function useDebouncedValue(value: string, delay = 250) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, setDebounceValue, delay]);

  return debounceValue;
}

const MewtruSolution: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedQuery = useDebouncedValue(query);
  const controller = new AbortController();

  useEffect(() => {
    const { signal } = controller;
    (async () => {
      setSuggestions([]);
      if (debouncedQuery.length > 0) {
        console.log(debouncedQuery);
        const data = await getAutocompleteResults(debouncedQuery, signal);
        setSuggestions(data);
      }
    })();

    // when the effect re-runs or the component is unmounted, we cancel the pending request:
    // - in case component is unmounted, we no longer care about the result
    // - when effect re-runs (`debouncedQuery` is updated), then we want to fire a new request to the server
    return () => {
      controller.abort("cancel request");
    };
  }, [debouncedQuery]);
  return (
    <div>
      <input onChange={(e) => setQuery(e.target.value)} />
      <div>
        {suggestions.map((fruit) => (
          <div key={fruit}>{fruit}</div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <main>
    <MySolution />
    <MewtruSolution />
  </main>
);

export default App;
