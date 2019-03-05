import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useWeb3Context } from 'web3-react'

const ABI = [{"constant": false,"inputs": [{"name": "to","type": "address"},{"name": "tokenId","type": "uint256"}],"name": "approve","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "cupId","type": "uint256"}],"name": "finalizeMint","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "cupId","type": "uint256"},{"name": "hasProxy","type": "bool"}],"name": "initiateMint","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "cupId","type": "uint256"},{"name": "hasProxy","type": "bool"}],"name": "redeem","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "from","type": "address"},{"name": "to","type": "address"},{"name": "tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "from","type": "address"},{"name": "to","type": "address"},{"name": "tokenId","type": "uint256"},{"name": "_data","type": "bytes"}],"name": "safeTransferFrom","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "to","type": "address"},{"name": "approved","type": "bool"}],"name": "setApprovalForAll","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "from","type": "address"},{"name": "to","type": "address"},{"name": "tokenId","type": "uint256"}],"name": "transferFrom","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"name": "from","type": "address"},{"indexed": true,"name": "to","type": "address"},{"indexed": true,"name": "tokenId","type": "uint256"}],"name": "Transfer","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "owner","type": "address"},{"indexed": true,"name": "approved","type": "address"},{"indexed": true,"name": "tokenId","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "owner","type": "address"},{"indexed": true,"name": "operator","type": "address"},{"indexed": false,"name": "approved","type": "bool"}],"name": "ApprovalForAll","type": "event"},{"constant": true,"inputs": [{"name": "owner","type": "address"}],"name": "balanceOf","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "cups","outputs": [{"name": "step","type": "uint256"},{"name": "lad","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "cupToToken","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "tokenId","type": "uint256"}],"name": "getApproved","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "owner","type": "address"},{"name": "operator","type": "address"}],"name": "isApprovedForAll","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "name","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "interfaceId","type": "bytes4"}],"name": "supportsInterface","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "symbol","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "index","type": "uint256"}],"name": "tokenByIndex","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "owner","type": "address"},{"name": "index","type": "uint256"}],"name": "tokenOfOwnerByIndex","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "tokenId","type": "uint256"}],"name": "tokenURI","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "totalSupply","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}]
const address = "0xC64ba42da6a88cf427a3bCc7C9Fa71F4DaF59764"



function MyComponent() {
    const context = useWeb3Context()
    let contract;

    context.connectorName !== "metamask" ? context.setConnector("metamask") : console.log("blah")

    console.log(context)
    
    const [cup, setCup] = useState('')

    function init(e) {
        e.preventDefault()
        contract = new context.library.eth.Contract(ABI, address)
        contract.methods.initiateMint(cup, true).send({from: context.account});
    }

    function final(e) {
        e.preventDefault()
        contract = new context.library.eth.Contract(ABI, address)
        contract.methods.finalizeMint(cup).send({from: context.account});
    }

    function red(e) {
        e.preventDefault()
        contract = new context.library.eth.Contract(ABI, address)
        contract.methods.redeem(cup, true).send({from: context.account});
    }

    return (
        <>
        <p>{context.account}</p>
        <div id="Initialize">
            <form onSubmit={e => init(e)}>
                <label>
                Initialze:
                <input value={cup} onChange={e => setCup(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
        <div id="Finalize">
            <form onSubmit={e => final(e)}>
                <label>
                Initialze:
                <input value={cup} onChange={e => setCup(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
        <div id="Redeem">
            <form onSubmit={e => red(e)}>
                <label>
                Initialze:
                <input value={cup} onChange={e => setCup(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
        </>
    )
    
}

export default MyComponent;