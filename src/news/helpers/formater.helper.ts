export function getGuardianContributors(tags: { webTitle: string }[]): string {
  return tags.map(tag => tag.webTitle).join(', ');
}
