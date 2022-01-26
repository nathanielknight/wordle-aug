import { WORDS } from "./words.js";
function getParams() {
    const queryInput = document.getElementById("pattern-input");
    const query = queryInput.value;
    const exclude = new Set();
    for (const elt of document.getElementsByClassName("exclude-letter")) {
        if (elt.checked) {
            exclude.add(elt.dataset["letter"]);
        }
    }
    const include = new Set();
    for (const elt of document.getElementsByClassName("include-letter")) {
        if (elt.checked) {
            include.add(elt.dataset["letter"]);
        }
    }
    console.debug('collected params:', { query, exclude });
    return { query, exclude, include };
}
function matchingWords({ query, exclude, include }) {
    let matchPattern = new RegExp(query, "i");
    let excludePattern = new RegExp(`[${Array.from(exclude).join('')}]`, "i");
    console.debug(`Matching on '${matchPattern}', excluding on '${excludePattern}'`);
    let matched = Array.from(WORDS)
        .filter(w => Boolean(w.match(matchPattern)))
        .filter(w => !Boolean(w.match(excludePattern)))
        .filter(w => Array.from(include).every(l => w.includes(l)));
    return matched;
}
function setResults(words) {
    const output = document.getElementById("results");
    const status = document.getElementById("status");
    if (words.length > 0) {
        output.innerText = words.join(" ");
        status.innerText = `${words.length} results`;
    }
    else {
        output.innerText = "";
        status.innerText = "No results";
    }
}
function search() {
    const params = getParams();
    const words = matchingWords(params);
    setResults(words);
}
document.addEventListener("keydown", e => {
    if (e.code === "Enter") {
        search();
    }
});
const searchbutton = document.getElementById("search-button");
searchbutton.addEventListener("click", search);
function resetExclude() {
    for (const elt of document.getElementsByClassName("exclude-letter")) {
        elt.checked = false;
    }
}
const clearButton = document.getElementById("reset-exclude");
clearButton === null || clearButton === void 0 ? void 0 : clearButton.addEventListener("click", resetExclude);
``;
