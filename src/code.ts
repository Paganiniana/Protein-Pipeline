enum DnaNucleotide {
    thymine=0,
    cytosine=1,
    adenine=2,
    guanine=3,
}

enum RnaNucleotide {
    uracil=0,
    cytosine=1,
    adenine=2,
    guanine=3,
}

enum Protein {
    // nonpolar, aliphatic R groups
    glycine,
    alanine,
    valine,
    leucine,
    methionine, // also serves as the START control statement
    isoleucine,
    //polar, uncharged R groups
    serine,
    threonine,
    cysteine,
    proline,
    asparagine,
    glutamine,
    // positively charged R groups
    lysine,
    arginine,
    histidine,
    // negatively charged R groups
    aspartate,
    glutamate,
    // nonpolar, aromatic R groups
    phenylalanine,
    tyrosine,
    tryptophan,
    // control statements
    STOP,
}   

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
}

/**
 * It's an inverted index ...
 */
const key:EnumDictionary<Protein, number[]>  = {
    [Protein.phenylalanine]: [0, 1],
    [Protein.leucine]: [2, 3, 16, 17, 18, 19], // leucine is discontinuous
    [Protein.serine]: [4, 5, 6, 7, 44, 45], // serine is discontinuous
    [Protein.tyrosine]: [8, 9],
    [Protein.STOP]: [10, 11, 14], // stop is also discontinuous
    [Protein.cysteine]: [12, 13],
    [Protein.tryptophan]: [15],
    // leucine (^)
    [Protein.proline]: [20, 21, 22, 23],
    [Protein.histidine]: [24, 25],
    [Protein.glutamine]: [26, 27],
    [Protein.arginine]: [28, 29, 30, 31, 46, 47], // also discontinuous
    [Protein.isoleucine]: [32, 33, 34],
    [Protein.methionine]: [35],
    [Protein.threonine]: [36, 37, 38, 39],
    [Protein.asparagine]: [40, 41],
    [Protein.lysine]: [42, 43],
    // serine (^)
    // arginine (^)
    [Protein.valine]: [48, 49, 50, 51],
    [Protein.alanine]: [52, 53, 54, 55],
    [Protein.aspartate]: [56, 57],
    [Protein.glutamate]: [58, 59],
    [Protein.glycine]: [60, 61, 62, 63],
}

const names:EnumDictionary<Protein, string> = {
    [Protein.phenylalanine]: "phenylalanine",
    [Protein.leucine]: "leucine",
    [Protein.serine]: "serine",
    [Protein.tyrosine]: "tyrosine",
    [Protein.STOP]: "STOP",
    [Protein.cysteine]: "cysteine",
    [Protein.tryptophan]: "tryptophan",
    [Protein.proline]: "proline",
    [Protein.histidine]: "histidine",
    [Protein.glutamine]: "glutamine",
    [Protein.arginine]: "arginine",
    [Protein.isoleucine]: "isoleucine",
    [Protein.methionine]: "methionine",
    [Protein.threonine]: "threonine",
    [Protein.asparagine]: "asparagine",
    [Protein.lysine]: "lysine",
    [Protein.valine]: "valine",
    [Protein.alanine]: "alanine",
    [Protein.aspartate]: "aspartate",
    [Protein.glutamate]: "glutamate",
    [Protein.glycine]: "glycine",
}

function codonToNumberRna(codon:string) {
    let codonKey = "ucag";
    let base4 = '';
    for (let char of codon)
        base4+=codonKey.indexOf(char);
    return parseInt(base4, 4)
}

/**
 * @param ns a nucleotide sequence
 */
function nucleotideToCodons(ns: string):string[] {
    // 0. trim to ignore trailing nucleotides
    if (ns.length % 3 !== 0) {
        ns = ns.slice(0, ns.length - ns.length % 3);
    }

    // 1. initialize the array and split into codons
    let codons:string[] = []
    for (let i = 0; i < ns.length; i+=3) {
        codons.push(ns.slice(i, i + 3));
    }   
    return codons;
}   

function getNameByIndex(i:number):string {
    for (let p in Protein) {
        if (key[p].includes(i))
            return names[p] as string;
    }
}

/** 
 * Putting it all together... 
 * @param {string} ns nucleotide sequence
 * @returns an array of [codon, protein]
 */
export function nucleotideToAminoAcidSequence(ns:string): string[][] {
    // 1. split into codons
    let codons = nucleotideToCodons(ns);
    
    // 2. convert codons to base4 indexes
    let indexes = codons.map(codonToNumberRna);

    // 3. get the names
    let names = indexes.map(getNameByIndex)

    // 4. combine
    let res:string[][] = [];
    for (let i = 0; i < codons.length; i ++) {
        res.push([codons[i], names[i]]);
    }
    return res;
}

