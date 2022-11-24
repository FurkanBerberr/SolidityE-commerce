// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "./Users.sol";

contract DProduct {

    Users public s_users;
    uint256 s_p_id;

    struct D_product{
        uint256 p_id;
        uint256 follow_number;
        string[] imagesPaths;
        string name;
        string description;
        address[] followers;
    }

    constructor(address _userContractAddress){
        s_users = Users(_userContractAddress);
    }

    function createDProduct(string[] memory _images, string memory _name, string memory _description) private{
        require(s_users.hasRole(s_users.DESIGNER_ROLE(), msg.sender), "User is not Designer!!");
        address[] memory followers;
        D_product memory new_product = D_product(
            ++s_p_id,
            0,
            _images,
            _name,
            _description,
            followers
        );
    }


}