export const fetchRandomQuote = () => {
    return fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        return data.content;
      })
      .catch((error) => {
        console.log('Error fetching quote:', error);
        return '';
      });
  };
  