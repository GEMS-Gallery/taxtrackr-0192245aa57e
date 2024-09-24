import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from "declarations/backend";

const agent = new HttpAgent();
const backend = Actor.createActor(backend_idl, { agent, canisterId: backend_id });

document.getElementById("addTaxPayerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const tid = document.getElementById("tid").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;

    try {
        const result = await backend.addTaxPayer(tid, firstName, lastName, address);
        alert(result);
        loadTaxPayers();
    } catch (error) {
        console.error("Failed to add TaxPayer:", error);
    }
});

document.getElementById("searchButton").addEventListener("click", async () => {
    const tid = document.getElementById("searchTID").value;
    try {
        const taxPayer = await backend.searchTaxPayerByTID(tid);
        const resultDiv = document.getElementById("searchResult");
        if (taxPayer) {
            resultDiv.textContent = `Found: ${taxPayer.firstName} ${taxPayer.lastName}, Address: ${taxPayer.address}`;
        } else {
            resultDiv.textContent = "No TaxPayer found with that TID.";
        }
    } catch (error) {
        console.error("Failed to search TaxPayer:", error);
    }
});

async function loadTaxPayers() {
    try {
        const taxPayers = await backend.getAllTaxPayers();
        const list = document.getElementById("taxPayerList");
        list.innerHTML = "";
        taxPayers.forEach(tp => {
            const listItem = document.createElement("li");
            listItem.textContent = `${tp.tid}: ${tp.firstName} ${tp.lastName}, Address: ${tp.address}`;
            list.appendChild(listItem);
        });
    } catch (error) {
        console.error("Failed to load TaxPayers:", error);
    }
}

loadTaxPayers();
