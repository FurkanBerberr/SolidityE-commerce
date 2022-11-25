const { expect } = require("chai");


describe("Product----------------", async function(){
    let dProduct, deployer, addr1, addr2 

    beforeEach(async function(){
        const DProduct = await ethers.getContractFactory("DProduct");

        [deployer, addr1, addr2] = await ethers.getSigners();

        dProduct = await DProduct.deploy();
    })

    describe("Designers products", function(){
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
        it("Delete product", async function(){
            await dProduct.makeDesigner(deployer.address, "Designer", "designer1", 5849851245, "mail@mail.com", 56921475842, "location")
            await dProduct.createDProduct([], "Tshirt", "Best product")
            await dProduct.createDProduct([], "Tshirt2", "Best product2")
            await dProduct.createDProduct([], "Tshirt3", "Best product3")
            await dProduct.deleteDProduct(1)
            console.log(await dProduct.d_products(1))
            let array = await dProduct.oneDesignerProducts(deployer.address)
        })
    })

})