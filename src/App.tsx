import "./App.css";
import { useCallback, useEffect, useState } from "react";

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

async function getAutocompleteResults(query: string): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
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

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const cb = useCallback(
    debounce((query: string) => {
      console.log("Called:", query);
      if (!query) {
        return;
      }
      getAutocompleteResults(query).then((r) => setResults(r));
    }, 1000),
    [setResults],
  );

  useEffect(() => {
    cb(query);
  }, [query]);

  return (
    <div className="App">
      <input onChange={(e) => setQuery(e.target.value)} />
      <div>
        {results.map((fruit) => (
          <div key={fruit}>{fruit}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
