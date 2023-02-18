const { expect } = require("chai");
require( "@nomicfoundation/hardhat-chai-matchers" )
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

const ethAddr = '0x892BB2e4F6b14a2B5b82Ba8d33E5925D42D4431F';

describe("Token contract", function() {

    let myToken;
    let message;
    let transporter;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function() {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        const Message = await ethers.getContractFactory("Message");
        message = await Message.deploy();
        await message.deployed();

        const MyToken = await ethers.getContractFactory("MyToken");
        myToken = await MyToken.deploy();
        await myToken.deployed();

        const Transporter = await ethers.getContractFactory("Transporter", {
            libraries: {
                Message: message.address,
            }
        });
        transporter = await Transporter.deploy(myToken.address); 
        await transporter.deployed();
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

    describe("Authorizations", function() {
        it("Allows granting an allowance to another smart contract", async function() {
            await myToken.transfer(addr1.address, 50);
            await myToken.connect(addr1).approve(transporter.address, 10);
            const allowance = await myToken.allowance(addr1.address, transporter.address);
            expect(Number(allowance)).to.equal(10);
        });

        it("Allows transferring tokens using the allowance", async function() {
            await myToken.transfer(addr1.address, 50);
            await myToken.connect(addr1).approve(addr2.address, 10);
            await  myToken.connect(addr2).transferFrom(addr1.address, addr3.address, 5);
            const addr3Balance = await myToken.balanceOf(addr3.address);
            expect(Number(addr3Balance)).to.equal(5);
        });

        it("Allows burning tokens using the allowance", async function() {
            const ethAccount = await message.addressToBytes32(ethAddr);
            const totalSupply = await myToken.totalSupply();
            await myToken.transfer(addr1.address, 50);
            await myToken.connect(addr1).approve(transporter.address, 10);
            await expect(transporter.connect(addr1).depositForBurn(5,ethAccount))
            .to.emit(myToken,"Transfer")
            .withArgs(addr1.address,ethers.constants.AddressZero, 5);
            const addr1Balance = await myToken.balanceOf(addr1.address);
            expect(Number(addr1Balance)).to.equal(45);
            
            const postburnSupply = await myToken.totalSupply();
            expect(Number(postburnSupply)).to.equal(Number(totalSupply) - 5);
        });

    });

});