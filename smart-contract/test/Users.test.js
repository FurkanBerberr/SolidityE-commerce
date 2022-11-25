const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("Website", async function(){
    let users, deployer, addr1, addr2 

    beforeEach(async function(){
        const Users = await ethers.getContractFactory("Users");

        [deployer, addr1, addr2] = await ethers.getSigners();

        users = await Users.deploy();
    })

    describe("Deployment", function(){
        it("Should check the deployer has the admin role", async function(){
            const a_role = await users.DEFAULT_ADMIN_ROLE()
            const isAdmin = await users.hasRole(a_role, deployer.address)
            expect(isAdmin).to.equal(true)
        })
    })
    describe("Customer", function(){
        it("Giving customer role to another address", async function(){
            const c_role = await users.CUSTOMER_ROLE()
            await users.makeCustomer(addr1.address, "First", "customer", 532584169)
            const isCustomer = await users.hasRole(c_role, addr1.address)
            expect(isCustomer).to.equal(true)
        })
        it("Creates a customer and add it to the mapping", async function(){
            await users.makeCustomer(addr1.address, "Sec", "customer2", 4759842651)
            const user2 = await users.customerProfile(addr1.address)
            assert(user2.name.toString() == "Sec")
        })
        it("Emits the user created", async function(){
            await expect(users.makeCustomer(addr1.address, "Sec", "customer2", 4759842651)).to.emit(users,"CustomerCreated").withArgs(addr1.address, 1, "Sec", "customer2")
        })
    })
    describe("Designer", function(){
        it("Giving designer role to another address as an admin", async function(){
            const d_role = await users.DESIGNER_ROLE()
            await users.makeDesigner(addr1.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")
            const isDesigner = await users.hasRole(d_role, addr1.address)
            expect(isDesigner).to.equal(true)

        })
        it("Giving customer role to another address as an admin", async function(){
            const c_role = await users.CUSTOMER_ROLE()
            await users.makeDesigner(addr1.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")
            const isCustomer = await users.hasRole(c_role, addr1.address)
            expect(isCustomer).to.equal(true)
        })
        it("Calling the designer fucntion with account that does not have admin role", async function(){
            expect(users.connect(addr1).makeDesigner()).to.be.reverted
            
        })
        it("Creates a designer and add it to the mapping", async function(){
            await users.makeDesigner(addr1.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")
            const designer1 = await users.designerProfile(addr1.address)
            assert(designer1.name.toString() == "Designer")
        })
        it("Emits designer created", async function(){
            await expect(users.makeDesigner(addr1.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")).to.emit(users, "DesignerCreated").withArgs(addr1.address, 1, "Designer", "designer1", "mail@mail.com", 56921475842)
        })
    })
    describe("Manufacturer", function(){
        it("Giving manufacturer role to another address as an admin", async function(){
            const m_role = await users.MANUFACTURER_ROLE()
            await users.makeManufacturer(addr1.address, "Manufacturer", "manufacturer1", 5849851245, "mail@mail.com", 56921475842, "location")
            const isManufacturer = await users.hasRole(m_role, addr1.address)
            expect(isManufacturer).to.equal(true)

        })
        it("Giving customer role to another address as an admin", async function(){
            const c_role = await users.CUSTOMER_ROLE()
            await users.makeManufacturer(addr1.address, "Manufacturer", "manufacturer1", 5849851245, "mail@mail.com", 56921475842, "location")
            const isCustomer = await users.hasRole(c_role, addr1.address)
            expect(isCustomer).to.equal(true)
        })
        it("Calling the manufacturer fucntion with account that does not have admin role", async function(){
            expect(users.connect(addr1).makeManufacturer()).to.be.reverted
            
        })
        it("Creates a designer and add it to the mapping", async function(){
            await users.makeManufacturer(addr1.address, "Manufacturer", "manufacturer1", 5849851245, "mail@mail.com", 56921475842, "location")
            const manufacturer1 = await users.manufacturerProfile(addr1.address)
            assert(manufacturer1.name.toString() == "Manufacturer")
        })
        it("Emits manufacturer created", async function(){
            await expect(users.makeManufacturer(addr1.address, "Manufacturer", "manufacturer1", 5849851245, "mail@mail.com", 56921475842, "location")).to.emit(users, "ManufacturerCreated").withArgs(addr1.address, 1, "Manufacturer", "mail@mail.com", 56921475842)
        })
    })

})