
const contractAddress = "0x8EfeFd67F502B4Fd37D5C102E60cE1e07123baa9";

const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_novoStatus",
                "type": "string"
            }
        ],
        "name": "atualizarStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "novoStatus",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "atualizador",
                "type": "address"
            }
        ],
        "name": "StatusAtualizado",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "status",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ultimaCarteira",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "visualizarStatus",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let provider;
let signer;
let contract;

const connectButton = document.getElementById("connectButton");
const updateButton = document.getElementById("updateButton");

connectButton.onclick = async () => {

    if (window.ethereum) {

        await window.ethereum.request({ method: "eth_requestAccounts" });

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        contract = new ethers.Contract(contractAddress, abi, signer);

        const address = await signer.getAddress();

        document.getElementById("wallet").innerText =
            "Carteira conectada: " + address;

    } else {
        alert("Instale a Metamask!");
    }
};

updateButton.onclick = async () => {

    const status = document.getElementById("statusInput").value;

    if (!status) {
        alert("Digite um status!");
        return;
    }

    const tx = await contract.atualizarStatus(status);

    document.getElementById("result").innerText =
        "Transação enviada: " + tx.hash;

    await tx.wait();

    document.getElementById("result").innerText =
        "Status registrado com sucesso!";
};
