const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Token contract", function() {

    let myToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function() {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory("MyToken");
        myToken = await MyToken.deploy();
        await myToken.deployed();
    })
    

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await myToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply to the owner", async function() {
            const ownerBalance = await myToken.balanceOf(owner.address);
            const totalSupply = await myToken.totalSupply();
            expect(Number(totalSupply)).to.equal(Number(ownerBalance));
        });
    });

    describe("Transfers", function() {

        it("Balance should reflect transfer", async function() {
            await myToken.transfer(addr1.address, 50);
            const addr1Balance = await myToken.balanceOf(addr1.address);
            console.log("xxxx");
            console.log(addr1Balance);
            expect(Number(addr1Balance)).to.equal(50);
        });

        it("Should transfer between account", async function() {
            await myToken.transfer(addr1.address, 50);
            await myToken.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await myToken.balanceOf(addr2.address);
            expect(Number(addr2Balance)).to.equal(50);
        });
    });

});