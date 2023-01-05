// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";

interface UsersInterface{
  function makeDesigner(address _designer, string memory _name, string memory _surname, uint64 _number, string memory _email, uint256 _ssn, string memory _location) external;
  function giveDesignerRole(address _designer) external;
}

contract FProduct is ERC721, ERC721URIStorage, AccessControl{

    uint256 private tokenId;
    bytes32 private constant DESIGNER_ROLE = keccak256("DESIGNER_ROLE");
    UsersInterface UserContract;

    constructor(address _users_contract_address) ERC721("FinalProduct", "FP") {
        UserContract = UsersInterface(_users_contract_address);
    }

    function safeMint(string memory uri) public onlyRole(DESIGNER_ROLE) {
        tokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function makeD(address _designer, string memory _name, string memory _surname, uint64 _number, string memory _email, uint256 _ssn, string memory _location) public{
        UserContract.makeDesigner(_designer, _name, _surname, _number, _email, _ssn, _location);
    }
    function giveDRole(address _designer) public{
        UserContract.giveDesignerRole(_designer);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(_tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(_tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
