import fetch from 'node-fetch';

const GRAPHQL_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/jguthrie7/shrubpapergardens';
const existingSeedNftArt = [2,3,6,8,9,13,14,20,23,27,31,35,38,45,46,47,54,58,66,71,72,101,106,123,124,125,140,153,199,201,203,234,237,247,251,263,281,294,309,318,328,373,487,498,505,513,532,542,569,588,607,621,639,647,666,739,764,802,817,823,892,916,945,959,990,1021,1037,1094,1110,1168,1259,1317,1443,1707,1865,1885,1887,2395,2590,2647,2991,3384,3833,4219,5177,5191,5345,5351,5974,6806,8079,8620,9031,9074,9097,
1372,2344,2833,
]


const query = `
query MyQuery {
  pottedPlants {
    seed {
      id
      type
      name
      emotion
      dna
    }
    growth
    id
    shrubNft {
      id
    }
  }
}
`;

async function fetchData() {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query
      }),
    });

    const data = await response.json();
    // console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

let data = await fetchData();
const unmade = data.data.pottedPlants.filter(a => {
  return !existingSeedNftArt.includes(Number(a.seed.id))
});
console.log(unmade,"\n\n");
unmade.length ?
console.log("There are multiple unmade seeds for which shrub art must be made - report this immediately along with the above output") : 
console.log("All is good, report no need to produce more shrub art");
console.log("\n");
