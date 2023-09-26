
const Misheret = {
  Morning: 1,
  Noon: 2,
  Evening: 3,
  Night: 4
}

// Number of Guards or Mishmarot
const SIZE = 4;

// This function returns true if mishmetet 'w' prefers shomer 's1' over shomer 's'
function mishmeret_Prefered_s1_Over_s( prefer,  m,  s,  s1)
{

  // Check if s prefered to s over her current engagement (s1)
  for (let i = 0; i < SIZE; i++)
  {

    // If s comes AFTER s1 in list of mishmeret w, then w prefers her
    // current engagement, don't do anything
    if (prefer[m-SIZE][i] === s1){
      console.log(`Mishmeret ${m-SIZE+1} already taken`)
      console.log(`Mishmeret ${m-SIZE+1} is taken by Shomer ${s1+1}`)
      return true;
    }

    // If s comes BEFORE s1 in mishmeret w's list, then free her current
    // engagement and engage her with shomer s
    if (prefer[m-SIZE][i] === s){
      console.log(`Mishmeret ${m-SIZE+1} already taken`)
      console.log(`Mishmeret ${m-SIZE+1} is taken by Shomer ${s1+1}`)
      return false;
    }
  }
}

function calcShibutz(prefer1, prefer2)
{

  let mishPartner = new Array(SIZE);
  let mFree = new Array(SIZE);

  mishPartner.fill(-1);
  mFree.fill(false);
  let freeCount = SIZE;


  let uses = 0;

  while (freeCount > 0)
  {
    let S;
    for (S = 0; S < SIZE; S++)
      if (!mFree[S])
        break;

    console.log('Dealing with Shomer ' + (S+1)+ '\n');
    uses++;
    // console.log("time=" + Date.now(), "times=" + uses)
    if (uses > 10){
      // console.log('ERROR OOM!!!')
      break;
    }
    for (let i = 0; i < SIZE && mFree[S] === false; i++)
    {
      let M = prefer1[S][i];
      if (mishPartner[M-SIZE] === -1)
      {
        mishPartner[M-SIZE] = S;
        mFree[S] = true;
        freeCount--;
        let mishmeret = M-SIZE+1

        console.log(`Shomer ${S+1} is perfect matched to mishmeret ${Object.keys(Misheret)[mishmeret-1]} (${mishmeret})\n`)
      }

      else
      {
        let S1 = mishPartner[M-SIZE];

        if (!mishmeret_Prefered_s1_Over_s(prefer2, M, S, S1))
        {
          mishPartner[M-SIZE] = S;
          mFree[S] = true;
          mFree[S1] = false;
        }
      }
    }
  }


  // for tests
  let pairs = []
  console.log("  Mishmeret \tShomer" +"");
  for (let i = 0; i < SIZE; i++){
    console.log("   " + Object.keys(Misheret)[(i)] + " \t  " + (mishPartner[i]+1) +"");
    pairs.push([(i+1), (mishPartner[i]+1)])
  }
  return pairs
}

// TEST





/**
 *
 * @param {number[][]} shomrim
 * @return {*[]}
 */
export
function run(shomrim) {
  const mishmarot = [
    [1, 2, 3, 4],
    [2, 1, 3, 4],
    [3, 4, 2, 1],
    [4, 3, 2, 1],
  ];

  // for example
  if (!shomrim) {
    return [[1,0], [2, 0], [3, 0], [4, 0]];
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (shomrim[i][j] == null) {
        return [[1,0], [2, 0], [3, 0], [4, 0]];
      }
    }
  }

  // console.log(shomrim);
  // let arrText = "";
  // for (let i = 0; i < 4; i++) {
  //   for (let j = 0; j < 4; j++) {
  //     arrText += (shomrim[i][j] ?? "?") + ' ';
  //   }
  //   arrText += '\n';
  // }
  // console.log(arrText);

  // Shomerim get indexes:   0-3 (0 - (N-1))
  // Mishmerets get indexes: 4-7 (N - (2N-1))
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      shomrim[i][j] += -1 + 4
      mishmarot[i][j] -= 1
    }
  }

  let result = calcShibutz(shomrim, mishmarot);
  console.log(result)
  return result;
}

run(
  [
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 3, 4, 2],
    [1, 2, 3, 4],
  ]
);

// Shomer 1 -> Mishmeret 2
// Shomer 3 -> Mishmeret 1
// Shomer 2 -> Mishmeret 4
// Shomer 4 -> Mishmeret 3

