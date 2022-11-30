// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

// Import statements
import "./Users.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error Market__UserNotDesigner();
error Market__UserNotManufacturer();
error Market__UserNotCustomer();
error Market__NotValidPrice();
error Market__ProductDoesNotExist();
error Market__NotEnoughGiven();
error Market__ProductSold();

contract Market is Users{

    address payable public immutable feeAccount;
    uint public immutable feePercent;
    uint256 public itemCount;

    struct Product{
        IERC721 nft;
        uint256 itmeId;
        uint256 tokenId;
        uint256 price;
        uint256 percent;
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

    mapping(uint256 => Product) products;

    constructor(uint256 _feePercent){
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function createItem(IERC721 _nft, uint256 _tokenId, uint256 _price, uint256 _percent, string memory _name, string memory _description) external {
        if(!hasRole(DESIGNER_ROLE, msg.sender)) revert Market__UserNotDesigner();
        if(_price <= 0) revert Market__NotValidPrice();
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        itemCount++;

        products[itemCount] = Product(
            _nft,
            itemCount,
            _tokenId,
            _price,
            _percent,
            _name,
            _description,
            payable(msg.sender),
            payable(address(0)),
            payable(address(0)),
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

    function confirmBuyer(uint256 _itemId) external{
        if(!hasRole(CUSTOMER_ROLE, msg.sender)) revert Market__UserNotCustomer();
        uint256 totalPrice = getTotalPrice(_itemId);
        Product storage product = products[_itemId];
        product.cConfirm = true;
        product.customer = payable(msg.sender);
        product.owner.transfer(getPercentage(_itemId));
        product.manufacturer.transfer(product.price - getPercentage(_itemId));
        feeAccount.transfer(totalPrice - product.price);
        product.nft.transferFrom(address(this), msg.sender, product.tokenId);

    }
    
    function getTotalPrice(uint256 _itemId) view public returns(uint256){
        return(products[_itemId].price *(100 + feePercent)/100);
    }
    
    function getPercentage(uint256 _itemId) view public returns(uint256){
        return(products[_itemId].percent * products[_itemId].price / 100);
    }
    // Sell
}