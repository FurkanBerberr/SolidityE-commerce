// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

// Import statements
import "./Users.sol";

error Market__UserNotDesigner();
error Market__UserNotManufacturer();
error Market__NotValidPrice();
error Market__ProductDoesNotExist();
error Market__NotEnoughGiven();
error Market__ProductSold();

contract Market is Users{

    uint256 public itemCount;

    struct Product{
        IERC721 nft;
        uint256 itmeId;
        uint256 tokenId;
        uint256 price;
        string name;
        string description;
        address payable owner;
        address payable manufacturer;
        address payable customer;
        bool sold;
        bool mConfirm;
        bool cConfirm;
    }

    event ProductCreated(
        address indexed nft,
        address indexed seller,
        uint256 itemId,
        uint256 tokenId,
        string name,
        string description
    );

    mapping(uint256 => address) products;

    function createItem(IERC721 _nft, uint256 _tokenId, uint256 _price, string memory _name, string memory _description) external {
        if(!hasRole(DESIGNER_ROLE, msg.sender)) revert Market__UserNotDesigner();
        if(_price <= 0) revert Market__NotValidPrice();
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        itemCount++;

        products[itemCount] = Product(
            _nft,
            itemCount,
            _tokenId,
            _price,
            _name,
            _description,
            msg.sender,
            address(0),
            address(0),
            false,
            false,
            false
        );

        emit ProductCreated(address(_nft), msg.sender, itemCount, _tokenId, _name, _description);
    }

    function confirmManufacturer(uint256 _itemId) external{
        if(!hasRole(MANUFACTURER_ROLE, msg.sender)) revert Market__UserNotManufacturer();
        Product storage product = products[_itemId];
        product.mConfirm = true;
        product.manufacturer = payable(msg.sender);
    }

    function purchaseProduct(uint256 _itemId) external payable{
        Product storage product = products[_itemId];
        if(_itemId < 0 && _itemId > itemCount) revert Market__ProductDoesNotExist();
        if(msg.value < product.price) revert Market__NotEnoughGiven();
        if(product.sold) revert Market__ProductSold();
        product.sold = true;
        product.customer = payable(msg.sender);
    }
    // It should be sell function
    function purchaseProduct(uint256 _itemId) external payable{
        Product storage product = products[_itemId];
        if(_itemId < 0 && _itemId > itemCount) revert Market__ProductDoesNotExist();
        if(msg.value < product.price) revert Market__NotEnoughGiven();
        if(product.sold) revert Market__ProductSold();
        product.sold = true;
        product.customer = payable(msg.sender);
    }
    // Sell
}