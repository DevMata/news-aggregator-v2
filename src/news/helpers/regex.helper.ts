const newYorkAuthorRegex = /^(By )(?<author>[\w\.\,\- ]+)$/;

export function getNewYorkAuthor(original: string): string {
  const regexExec = newYorkAuthorRegex.exec(original);

  if (regexExec && regexExec.groups && regexExec.groups.author) {
    return regexExec.groups.author;
  } else {
    return null;
  }
}
