export function getGuardianContributors(tags: { webTitle: string }[]): string {
  const contributors: string[] = [];

  tags.forEach(tag => contributors.push(tag.webTitle));

  return contributors.join(', ');
}
