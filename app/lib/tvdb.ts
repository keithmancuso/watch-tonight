export async function fetchTVDBShows() {
  const tvdbAuthToken = process.env.TVDB_AUTH_TOKEN;

  if (!tvdbAuthToken) {
    throw new Error('TVDB_AUTH_TOKEN is not set');
  }

  try {
    const baseUrl = 'https://api4.thetvdb.com/v4/series/filter';
    const params = new URLSearchParams({
      country: 'usa',
      lang: 'eng',
      sort: 'score',
      sortType: 'desc',
      year: '2024',
      status: '1'
    });
    const url = `${baseUrl}?${params}`;

    const headers = {
      'Authorization': `Bearer ${tvdbAuthToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`TVDB API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Strip out unwanted fields from each series in the data
    const strippedData = data.data.map((series: any) => {
      const {
        nameTranslations,
        overviewTranslations,
        aliases,
        status,
        firstAired,
        lastAired,
        nextAired,
        originalCountry,
        originalLanguage,
        defaultSeasonType,
        isOrderRandomized,
        lastUpdated,
        episodes,
        ...keepFields
      } = series;
      return keepFields;
    });

    // Return only the top 10 shows
    return strippedData.slice(0, 10);
  } catch (error) {
    console.error('Error fetching data from TVDB:', error);
    throw new Error('Failed to fetch data from TVDB');
  }
}