export const limitText = (max: number, text: string): string => {
    if (text.length > max) {
      return `${text.slice(0, max)}...`;
    }

    return text;
  };
