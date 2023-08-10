import './style.css'

import { nucleotideToProteinSequence } from './code';

const NUCLEOTIDE_SEQUENCE_A = "aguuguuaucgaaaacugcgaguaaauauccugagggcgcgaagcaacc";
const NUCLEOTIDE_SEQUENCE_B = "aguuguaucgaaaacugcgaguaaauauccugagggcgcgaagcaacc";

// console.log(nucleotideToProteinSequence(NUCLEOTIDE_SEQUENCE_A));


const button = document.getElementById("translate") as HTMLButtonElement;
const input = document.getElementById("input") as HTMLInputElement;
const tbody = document.getElementById("output") as HTMLTableSectionElement;

function fillTable() {
  let ns = input.value;
  /** @todo - error handling */
  let res = nucleotideToProteinSequence(ns);

  // clear table
  tbody.innerHTML = "";

  // convert to table rows
  for (let pair of res) {
    // create nodes
    let row = document.createElement("tr");
    let codonCell = document.createElement("td");
    let proteinCell = document.createElement("td");
    
    // fill text
    codonCell.innerText = pair[0];
    proteinCell.innerText = pair[1];

    // add to dom
    row.appendChild(codonCell);
    row.appendChild(proteinCell);
    tbody.appendChild(row);
  }
}

// event listener
button.addEventListener("click", fillTable);
// set default
input.value = NUCLEOTIDE_SEQUENCE_B;