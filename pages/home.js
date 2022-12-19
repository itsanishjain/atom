import axios from "axios";
import React, { useState, useContext } from "react";
import { Web3ModalContext } from "../src/context/Web3ModalProvider";
import {
  contractAddress,
  contractABI,
  WXDCAddress,
  WUSDAddress,
  TestStablecoinAddress,
  PoolAddress,
  WXDCABI,
  WUSDABI,
  TestStablecoinABI,
  PoolABI,
} from "../src/utils/constants";

import { utils, provider, Contract } from "ethers";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

var newWeb3 = require("web3");
let hash;

const EIP712SignatureTypes = {
  SignatureContent: [
    { name: "nonce", type: "uint256" },
    { name: "price", type: "uint256" },
    { name: "multipliedBy", type: "uint256" },
    { name: "timestamp", type: "uint40" },
  ],
};

const Home = () => {
  const [number, setNumber] = useState(1);
  const [XDC, setXDC] = useState("1");
  const [withdrawXDC, setWithdrawXDC] = useState();

  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState(0);
  const [USDAmount, setUSDAmount] = useState(0);
  const [withdrawUSDAmount, setWithdrawUSDAmount] = useState(0);
  const [liquidAddress, setLiquidAddress] = useState();

  const [loading, setLoading] = useState();

  const { account, connect, disconnect, web3, signerEthers } =
    useContext(Web3ModalContext);

  const getBlockNumber = async () => {
    //TODO: blockchain calls
    console.log("funtion called");
    const NameContract = new web3.eth.Contract(contractABI, contractAddress);
    let tx = await NameContract.methods.retrieve().call();
    console.log(tx);
    setNumber(tx);
  };

  const setBlockNumber = async (e) => {
    e.preventDefault();
    console.log("SET funtion called");
    const con = new Contract(contractAddress, contractABI, signerEthers);
    // const NameContract = new web3.eth.Contract(contractABI, contractAddress);
    // let tx = await NameContract.methods.store(number).send({ from: account });
    // console.log(tx, "DONE");

    let tx = await con.store(number);
    console.log(tx);
  };

  const generateMessage = () => {
    return Math.floor(Math.random() * 1000000);
  };

  function getEIP712Domain(address) {
    return {
      name: "LilCompound",
      version: "1.0",
      verifyingContract: address,
    };
  }

  function getSignatureContentObject(signatureContent) {
    return {
      nonce: signatureContent.nonce,
      price: signatureContent.price,
      multipliedBy: signatureContent.multipliedBy,
      timestamp: signatureContent.timestamp,
    };
  }

  function getSignatureHashBytes(signatureContent, contractAddress) {
    return ethers.utils._TypedDataEncoder.hash(
      getEIP712Domain(contractAddress),
      EIP712SignatureTypes,
      getSignatureContentObject(signatureContent)
    );
  }

  async function signSignature(signatureContent, contractAddress, signer) {
    return signer._signTypedData(
      getEIP712Domain(contractAddress),
      EIP712SignatureTypes,
      getSignatureContentObject(signatureContent)
    );
  }

  async function timestampFromNow(delta) {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://erpc.apothem.network"
    );
    const lastBlockNumber = await provider.getBlockNumber();
    const lastBlock = await provider.getBlock(lastBlockNumber);

    return lastBlock.timestamp + delta;
  }

  const XDC_ACCOUNT_2_PK =
    "f3f7097ebda3883ecc6cf8bfb166cd3fa3ba6f8a9a54cf1873539a94e2827e9f";

  const singAMessage = async () => {
    const response = await axios.get("/api/coinmarket");
    const XDC_PRICE_USD = response.data.result.data[2634].quote.USD.price;
    0;

    const SignatureContent = {
      nonce: generateMessage(),
      price: parseInt(XDC_PRICE_USD * 10 ** 6),
      multipliedBy: 10 ** 6,
      timestamp: await timestampFromNow(100),
    };

    hash = getSignatureHashBytes(
      SignatureContent,
      "0x310d87b6b975bD00a66a04596779385Eee2BAF7e"
    );

    const signer101 = new ethers.Wallet(
      XDC_ACCOUNT_2_PK,
      new ethers.providers.JsonRpcProvider("https://erpc.apothem.network")
    );

    let signature = await signSignature(
      SignatureContent,
      "0x310d87b6b975bD00a66a04596779385Eee2BAF7e",
      signer101
    );

    console.log(SignatureContent);

    console.log(signature);

    return { SignatureContent, signature };
  };

  // POOL CONTRACT FUNCTIONS

  const depositCollateralXDC = async (e) => {
    e.preventDefault();
    const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
    let tx = await NameContract.methods
      .depositCollateralXDC()
      .send({ from: account, value: utils.parseEther(XDC) });
    console.log(tx, "DONE");
  };

  const withdrawCollateralXDC = async (e) => {
    e.preventDefault();
    if (!withdrawXDC) {
      toast.error("Please set a amount");
      return;
    }
    const { SignatureContent, signature } = await singAMessage();

    const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
    let tx = await NameContract.methods
      .withdrawCollateralXDC(parseInt(withdrawXDC), SignatureContent, signature)
      .send({ from: account });
    console.log(tx, "DONE");
  };

  const borrow = async (e) => {
    e.preventDefault();
    const { SignatureContent, signature } = await singAMessage();

    console.log("WE GOT IT BRO");

    // const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
    const con = new Contract(PoolAddress, PoolABI, signerEthers);

    // let tx = await NameContract.methods
    //   .borrow(amount, currency, SignatureContent, signature)
    //   .send({ from: account });

    let tx = await con.borrow(amount, currency, SignatureContent, signature);
    await tx.wait();
    console.log(tx, "DONE");
  };

  const depositCollateralUSD = async (e) => {
    e.preventDefault();
    if (!USDAmount) {
      toast.error("Please set a amount");
      return;
    }
    try {
      const { SignatureContent, signature } = await singAMessage();

      const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
      let tx = await NameContract.methods
        .withdrawCollateralXDC(parseInt(USDAmount), SignatureContent, signature)
        .send({ from: account });
      console.log(tx, "DONE");
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in depositCollateralUSD");
    }
  };

  const withdrawCollateralUSD = async (e) => {
    e.preventDefault();
    if (!withdrawUSDAmount) {
      toast.error("Please set a amount");
      return;
    }
    try {
      const { SignatureContent, signature } = await singAMessage();

      const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
      let tx = await NameContract.methods
        .withdrawCollateralUSD(
          parseInt(withdrawUSDAmount),
          SignatureContent,
          signature
        )
        .send({ from: account });
      console.log(tx, "DONE");
      console.log("Success");
    } catch (error) {
      console.log(error);
      toast.error("Erronr in withdraw collateral USD");
    }
  };

  const liquidate = async (e) => {
    e.preventDefault();
    try {
      const { SignatureContent } = await singAMessage();

      const contract = new Contract(PoolAddress, PoolABI, signerEthers);

      // let tx = await contract.liquidate(liquidAddress, SignatureContent);
      let tx = await contract.liquidate();
      await tx.wait();
      console.log(tx, "DONE");
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Error in liquidate assets");
    }
  };

  return (
    <div className="mt-8 w-full p-4 md:w-1/2 mx-auto flex flex-col space-y-8">
      <form className="p-4 space-y-4" onSubmit={depositCollateralXDC}>
        <input
          type="text"
          name="XDC"
          value={XDC}
          onChange={(e) => setXDC(e.target.value)}
        ></input>
        <button>Deposit Collateral XDC</button>
      </form>

      <form className="p-4 space-y-4" onSubmit={withdrawCollateralXDC}>
        <input
          type="text"
          name="XDC"
          value={withdrawXDC}
          onChange={(e) => setWithdrawXDC(e.target.value)}
        ></input>
        <button>Withdraw Collateral XDC</button>
      </form>

      <form className="p-4 space-y-4" onSubmit={borrow}>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <div
          onChange={(e) => setCurrency(e.target.value)}
          className="w-64 mx-auto"
        >
          <div className="">
            <input
              type="radio"
              name="currency"
              value={0}
              // checked={currency === 0}
            ></input>
            <div>XDC</div>
          </div>
          <div>
            <input
              className=""
              type="radio"
              name="currency"
              value={1}
              // checked={currency === 1}
            ></input>
            <div>USD</div>
          </div>
        </div>
        <button>Borrow</button>
        currency:{currency}
      </form>

      <form className="p-4 space-y-4" onSubmit={depositCollateralUSD}>
        <input
          type="number"
          name="USDs"
          value={USDAmount}
          onChange={(e) => setUSDAmount(e.target.value)}
        ></input>
        <button>Deposit Collateral USD</button>
      </form>

      <form className="p-4 space-y-4" onSubmit={withdrawCollateralUSD}>
        <input
          type="number"
          name="USDs"
          value={withdrawUSDAmount}
          onChange={(e) => setWithdrawUSDAmount(e.target.value)}
        ></input>
        <button>Withdraw Collateral USD</button>
      </form>

      <form className="p-4 space-y-4" onSubmit={liquidate}>
        <input
          placeholder="address"
          type="text"
          name="liquidAddress"
          value={liquidAddress}
          onChange={(e) => setLiquidAddress(e.target.value)}
        ></input>
        <button>Liquidate</button>
      </form>
    </div>
  );
};

export default Home;
