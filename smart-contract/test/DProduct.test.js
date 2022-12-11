const { expect } = require("chai");


describe("Product", async function(){
    let users, dProduct, deployer, addr1, addr2 

    beforeEach(async function(){
        const DProduct = await ethers.getContractFactory("DProduct");
        const Users = await ethers.getContractFactory("Users");

        [deployer, addr1, addr2] = await ethers.getSigners();

        dProduct = await DProduct.deploy();
        users = await Users.deploy();
    })

    describe("Designers products", function(){
        it("Creating designer product", async function(){
            await dProduct.makeDesigner(deployer.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")
            let product = await dProduct.createDProduct([], "Tshirt", "Best product")
            expect(dProduct.d_products(0).owner).to.equal(product.owner)

        })
        it("Getting the one designer products", async function(){
            await dProduct.makeDesigner(deployer.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")
            await dProduct.makeDesigner(addr1.address, "Designer2", "designer2", 5849851245, "mail@mail.com", 56921475842, "location")
            await dProduct.createDProduct([], "Tshirt", "Best product")
            await dProduct.createDProduct([], "Tshirt2", "Best product2")
            await dProduct.connect(addr1).createDProduct([], "Tshirt2", "Best product2")
            let array = await dProduct.oneDesignerProducts(deployer.address)
            expect(array.length).to.equal(2)
        })
        it("When there is no pruduct returns empty array", async function(){
            await dProduct.makeDesigner(deployer.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")
            let array = await dProduct.oneDesignerProducts(deployer.address)
            expect(array.length).to.equal(0)
        })
    })
    describe("Delete product", function(){
        it("Delete product", async function(){
            await dProduct.makeDesigner(deployer.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")
            await dProduct.createDProduct([], "Tshirt", "Best product")
            await dProduct.createDProduct([], "Tshirt2", "Best product2")
            await dProduct.createDProduct([], "Tshirt3", "Best product3")
            let array = await dProduct.oneDesignerProducts(deployer.address)
            await dProduct.deleteDProduct(1)
            array = await dProduct.oneDesignerProducts(deployer.address)
            expect(array.length).to.equal(2)
        })
        it("Product does not exist while deleting", async function(){
            await dProduct.makeDesigner(deployer.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")
            await expect(dProduct.deleteDProduct(1)).to.be.revertedWithCustomError(dProduct, "DProduct__ProductDoesNotExist")
        })
        it("If the product is tried to be deleted outside the owner revert", async function(){
            await dProduct.makeDesigner(deployer.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")
            await dProduct.makeDesigner(addr1.address, "Designer2", "designer2", 5849851245, "mail@mail.com", 56921475842, "location")
            await dProduct.createDProduct([], "Tshirt", "Best product")
            await expect(dProduct.connect(addr1).deleteDProduct(0)).to.be.revertedWithCustomError(dProduct, "DProduct__UserNotOwner")
        })

    })

})