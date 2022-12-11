// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

// Import statements
import "../node_modules/hardhat/console.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "./DProduct.sol";

// Contracts
contract Users is AccessControl {

    // State variables
    bytes32 public constant CUSTOMER_ROLE = keccak256("CUSTOMER_ROLE");
    bytes32 public constant DESIGNER_ROLE = keccak256("DESIGNER_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");

    uint256 public s_c_id = 0;
    uint256 public s_d_id = 0;
    uint256 public s_m_id = 0;

    struct Customer {
        address c_address;
        uint256 id;
        string name;
        string surname;
        uint64 number;
    }

    struct Designer {
        address d_address;
        uint256 id;
        string name;
        string surname;
        uint64 number;
        string email;
        uint256 ssn;
        string location;
    }

    struct Manufacturer {
        address m_address;
        uint256 id;
        string name;
        string surname;
        uint64 number;
        string email;
        uint256 ssn;
        string location;
    }

    event CustomerCreated (
        address indexed c_address,
        uint256 indexed id,
        string name,
        string surname
    );
    
    event DesignerCreated (
        address indexed d_address,
        uint256 indexed id,
        string name,
        string surname,
        string indexed email,
        uint256 ssn
    );
    
    event ManufacturerCreated (
        address indexed m_address,
        uint256 indexed id,
        string name,
        string email,
        uint256 indexed ssn
    );

    mapping(uint256 => Customer) public customers;
    mapping(uint256 => Designer) public designers;
    mapping(uint256 => Manufacturer) public manufacturers;

    // Giving the Admin role to the deployer
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Giving the Customer role to the address
    // Creating the customer object
    // Adding the object into the mapping
    // Emits an event
    function makeCustomer(address _customer, string memory _name, string memory _surname, uint64 _number) public {
        _setupRole(CUSTOMER_ROLE, _customer);
        customers[++s_c_id] = Customer(
            _customer,
            s_c_id,
            _name,
            _surname,
            _number
        );
        emit CustomerCreated(_customer, s_c_id, _name, _surname);
    }

    // Giving the Designer and Customer role to the address
    // Creating the designer object
    // Adding the object into the mappings
    // Emits an event
    function makeDesigner(address _designer, string memory _name, string memory _surname, uint64 _number, string memory _email, uint256 _ssn, string memory _location) public {
        grantRole(DESIGNER_ROLE, _designer);
        grantRole(CUSTOMER_ROLE, _designer);
        designers[++s_d_id] = Designer(
            _designer,
            s_d_id,
            _name,
            _surname,
            _number,
            _email,
            _ssn,
            _location
        );
        emit DesignerCreated(_designer, s_d_id, _name, _surname, _email, _ssn);
    }

    // Giving the Manufacturer and Customer role to the address
    // Creating the manufacturer object
    // Adding the object into the mappings
    // Emits an event
    function makeManufacturer(address _manufacturer, string memory _name, string memory _surname, uint64 _number, string memory _email, uint256 _ssn, string memory _location) public {
        grantRole(MANUFACTURER_ROLE, _manufacturer);
        grantRole(CUSTOMER_ROLE, _manufacturer);
        manufacturers[++s_m_id] = Manufacturer(
            _manufacturer,
            s_m_id,
            _name,
            _surname,
            _number,
            _email,
            _ssn,
            _location
        );
        emit ManufacturerCreated( _manufacturer, s_m_id, _name, _email, _ssn);
    }

    // Returning the single customer for given address
    function customerProfile(address _customer) public view returns(Customer memory){
        Customer memory selected_customer;
        for(uint256 i = 1; i <= s_c_id; i++){
            if(customers[i].c_address == _customer) selected_customer = customers[i];
        }
        return selected_customer;
    }
    
    // Returning the single designer for given address
    function designerProfile(address _designer) public view returns(Designer memory){
        Designer memory selected_designer;
        for(uint256 i = 1; i <= s_d_id; i++){
            if(designers[i].d_address == _designer) selected_designer = designers[i];
        }
        return selected_designer;
    }
    
    // Returning the single manufacturer for given address
    function manufacturerProfile(address _manufacturer) public view returns(Manufacturer memory){
        Manufacturer memory selected_manufacturer;
        for(uint256 i = 1; i <= s_m_id; i++){
            if(manufacturers[i].m_address == _manufacturer) selected_manufacturer = manufacturers[i];
        }
        return selected_manufacturer;
    }

    function customerLogin(address _customer) view public returns(bool){
        for(uint256 i = 1; i<= s_d_id; i++){
            if(customers[i].c_address == _customer) return true;
        }
        return false;
    }

    function designerLogIn(address _designer) view public returns(bool){
        for(uint256 i = 1; i<= s_d_id; i++){
            if(designers[i].d_address == _designer) return true;
        }
        return false;
    }

}
