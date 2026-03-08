// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StatusProduto {

    string public status;
    address public ultimaCarteira;

    event StatusAtualizado(string novoStatus, address atualizador);

    function atualizarStatus(string memory _novoStatus) public {
        status = _novoStatus;
        ultimaCarteira = msg.sender;
        emit StatusAtualizado(_novoStatus, msg.sender);
    }

    function visualizarStatus() public view returns (string memory, address) {
        return (status, ultimaCarteira);
    }
}
