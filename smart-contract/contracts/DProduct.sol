// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "./Users.sol";
import "../node_modules/hardhat/console.sol";

error DProduct__ProductDoesNotExist();
error DProduct__UserIsNotDesigner();
error DProduct__UserNotOwner();

contract DProduct is Users {
    uint256 s_p_id;

    struct D_product{
        address owner;
        uint256 p_id;
        string[] imagesPaths;
        string name;
        string description;
    }

    mapping(uint256 => D_product) public d_products;

    function createDProduct(string[] memory _images, string memory _name, string memory _description) public{
        if(!hasRole(DESIGNER_ROLE, msg.sender)) revert DProduct__UserIsNotDesigner();
        D_product memory new_product = D_product(
            msg.sender,
            s_p_id,
            _images,
            _name,
            _description
        );
        d_products[s_p_id] = new_product;
        s_p_id++;
    }

    function oneDesignerProducts(address _designer) view public returns(D_product[] memory){
        if(!hasRole(DESIGNER_ROLE, _designer)) revert DProduct__UserIsNotDesigner();
        uint256 productCount = 0;
        uint256 locationIndex = 0;
        D_product[] memory products;

        for(uint256 i = 0; i < s_p_id; i++){
            if(d_products[i].owner == _designer)
                productCount++;
        }

        if(productCount == 0) return products;

        products = new D_product[](productCount);
        for(uint256 i = 0; i < s_p_id; i++){
            if(d_products[i].owner == _designer){
                products[locationIndex] = d_products[i];
                locationIndex++;
            }
        }
        return products;
    } 

    function deleteDProduct(uint256 _productId) public {
        address user;
        if(d_products[_productId].owner == user) revert DProduct__ProductDoesNotExist();
        if(!hasRole(DESIGNER_ROLE, msg.sender)) revert DProduct__UserIsNotDesigner();
        if(d_products[_productId].owner != msg.sender) revert DProduct__UserNotOwner();

        delete d_products[_productId];
    }

}