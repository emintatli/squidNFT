pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BSCSquidPunks is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public owner=0x7d477dd546090EBF7dB262ED23CAb058623B97b8;
    uint public normalPrice =100000000000000000; //0.1 eth
    uint public totalMint=0;
    uint public maxMint=9999;
    constructor() ERC721("BSCSquidPunks", "BSQP") {
    }
  

    receive() external payable {} 
    
     modifier onlyOwner{
        require(
            msg.sender==owner,"ADMIN_ONLY"
        );
        _;
    }
    function awardItem(address player, string[] memory tokenURI) public payable{
        require((tokenURI.length*normalPrice<=msg.value)&&(maxMint>=(tokenURI.length+totalMint)));
        for (uint i=0; i<tokenURI.length; i++) {
        uint256 newItemId = _tokenIds.current();
        _tokenIds.increment();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI[i]);
        totalMint++;
        }
    }
    function claimBalance(uint withdrawAmount) external payable onlyOwner{
        payable(msg.sender).transfer(withdrawAmount);
    }
    function changeOwner(address adres) external payable onlyOwner{
        owner=adres;
    }
    
}