function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString().replace(/GMT.*/, 'GMT');
}

export { formatDate };