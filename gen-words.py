import typing as ty


def write_output(outf: ty.TextIO, words: ty.List[str]) -> None:
    outf.write("export const WORDS=[")
    for word in words:
        outf.write(f"'{word}',")
    outf.write("];")


with open("./words.txt", "r") as inf:
    words = [s.strip() for s in inf.readlines()]

with open("./dist/words.js", "w") as outf:
    write_output(outf, words)
