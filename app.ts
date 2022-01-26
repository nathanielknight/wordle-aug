import { WORDS } from "./words.js"

interface Params {
    query: string,
    exclude: Set<string>,
    include: Set<string>,
}

function getParams(): Params {
    const queryInput = document.getElementById("pattern-input") as HTMLInputElement;
    const query = queryInput.value;
    const exclude: Set<string> = new Set();
    for (const elt of document.getElementsByClassName("exclude-letter") as HTMLCollectionOf<HTMLInputElement>) {
        if (elt.checked) {
            exclude.add(elt.dataset["letter"] as string)
        }
    }
    const include: Set<string> = new Set();
    for (const elt of document.getElementsByClassName("include-letter") as HTMLCollectionOf<HTMLInputElement>) {
        if (elt.checked) {
            include.add(elt.dataset["letter"] as string)
        }
    }
    console.debug('collected params:', { query, exclude });
    return { query, exclude, include };
}

function matchingWords({ query, exclude, include }: Params): ReadonlyArray<string> {
    let matchPattern = new RegExp(query, "i");
    let excludePattern = new RegExp(`[${Array.from(exclude).join('')}]`, "i");
    console.debug(`Matching on '${matchPattern}', excluding on '${excludePattern}'`);
    let matched = Array.from(WORDS as ReadonlyArray<string>)
        .filter(w => Boolean(w.match(matchPattern)))
        .filter(w => !Boolean(w.match(excludePattern)))
        .filter(w => Array.from(include).every(l => w.includes(l)));
    return matched;
}

function setResults(words: ReadonlyArray<string>): void {
    const output = document.getElementById("results") as HTMLDivElement;
    const status = document.getElementById("status") as HTMLParagraphElement;
    if (words.length > 0) {
        output.innerText = words.join(" ");
        status.innerText = `${words.length} results`;
    } else {
        output.innerText = "";
        status.innerText = "No results";
    }
}

function search(): void {
    const params = getParams();
    const words = matchingWords(params);
    setResults(words);
}

document.addEventListener("keydown", e => {
    if (e.code === "Enter") {
        search()
    }
});

const searchbutton = document.getElementById("search-button") as HTMLInputElement;
searchbutton.addEventListener("click", search);


function resetExclude(): void {
    for (const elt of document.getElementsByClassName("exclude-letter") as HTMLCollectionOf<HTMLInputElement>) {
        elt.checked = false;
    }
}

const clearButton = document.getElementById("reset-exclude");
clearButton?.addEventListener("click", resetExclude); ``