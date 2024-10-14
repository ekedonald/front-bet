export function getDifferenceInSeconds(givenTimeString: string): number {
  const givenDate = new Date(givenTimeString.replace(' ', 'T') + 'Z');

    const now = new Date();

    const differenceInSeconds = Math.floor((now.getTime() - givenDate.getTime()) / 1000);

    return differenceInSeconds;
}
