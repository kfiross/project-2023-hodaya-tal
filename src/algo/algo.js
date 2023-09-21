
const Misheret = {
  Morning: 1,
  Noon: 2,
  Evening: 3,
  Night: 4
}

// Javascript program for stable marriage problem

// Number of Men or Women
const N = 4;

// This function returns true if woman 'w' prefers man 'm1' over man 'm'
function wPrefersM1OverM( prefer,  w,  m,  m1)
{

  // Check if w prefers m over her current engagement m1
  for (var i = 0; i < N; i++)
  {

    // If m1 comes before m in list of w, then w prefers her
    // current engagement, don't do anything
    if (prefer[w-N][i] == m1){
      console.log(`Mishmeret ${w-N+1} already matched`)
      console.log(`Mishmeret ${w-N+1} is staisfied with Shomer ${m1+1}`)
      return true;
    }

    // If m comes before m1 in w's list, then free her current
    // engagement and engage her with m
    if (prefer[w-N][i] == m){
      console.log(`Mishmeret ${w-N+1} already matched`)
      console.log(`Mishmeret ${w-N+1} is staisfied with Shomer ${m1+1}`)
      return false;
    }
  }
}

// Prints stable matching for N boys and N girls. Boys are numbered as 0 to
// N-1. Girls are numbered as N to 2N-1.
function calcShibutz(prefer1, prefer2)
{

  var wPartner = new Array(N);
  var mFree = new Array(N);

  wPartner.fill(-1);
  mFree.fill(false);
  var freeCount = N;


  while (freeCount > 0)
  {
    var m;
    for (m = 0; m < N; m++)
      if (mFree[m] == false)
        break;

    console.log('Dealing with Shomer ' + (m+1)+ '\n')
    for (var i = 0; i < N && mFree[m] == false; i++)
    {
      var w = prefer1[m][i];
      if (wPartner[w-N] == -1)
      {
        wPartner[w-N] = m;
        mFree[m] = true;
        freeCount--;
        console.log(`Shomer ${m+1} is perfect matched with ${w-N+1}\n`)
      }

      else
      {
        var m1 = wPartner[w-N];

        if (wPrefersM1OverM(prefer2, w, m, m1) == false)
        {
          wPartner[w-N] = m;
          mFree[m] = true;
          mFree[m1] = false;
        }
      }
    }
  }


  // for tests
  let pairs = []
  console.log("  Mishmeret \tShomer" +"");
  for (var i = 0; i < N; i++){
    console.log("   " + Object.keys(Misheret)[(i+1)] + " \t  " + (wPartner[i]+1) +"");
    pairs.push([(i+1), (wPartner[i]+1)])
  }
  return pairs
}

// TEST

// Shomers 0-3
// Mishmerets 4-7

var shomrim  = [
  [3, 1, 2, 4],
  [4, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 1, 4],
];


var mishmarot  = [
  [1, 2, 3, 4],
  [2, 1, 3, 4],
  [3, 4, 2, 1],
  [4, 3, 2, 1],
];

for(let i=0; i<N; i++) {
  for (let j = 0; j < N; j++) {
    shomrim[i][j] += -1 + 4
    mishmarot[i][j] -= 1
  }
}
console.log(shomrim)
console.log(mishmarot)
let result = calcShibutz(shomrim ,mishmarot);
console.log(result)


// Shomer 1 -> Mishmeret 2
// Shomer 3 -> Mishmeret 1
// Shomer 2 -> Mishmeret 4
// Shomer 4 -> Mishmeret 3

/// export default calcShibutz;
