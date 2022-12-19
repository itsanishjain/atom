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

import { utils, provider } from "ethers";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

var newWeb3 = require("web3");

const Home = () => {
  const [number, setNumber] = useState(1);
  const [XDC, setXDC] = useState("1");
  const [withdrawXDC, setWithdrawXDC] = useState();

  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState(0);

  const { account, connect, disconnect, web3 } = useContext(Web3ModalContext);

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
    const NameContract = new web3.eth.Contract(contractABI, contractAddress);
    let tx = await NameContract.methods.store(number).send({ from: account });
    console.log(tx, "DONE");
  };

  const generateMessage = () => {
    return Math.floor(Math.random() * 1000000);
  };

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
    console.log(newWeb3);
    const aweb3 = new newWeb3();
    const response = await axios.get("/api/coinmarket");
    const XDC_PRICE_USD = response.data.result.data[2634].quote.USD.price;
    const message = {
      nonce: generateMessage(),
      price: parseInt(XDC_PRICE_USD * 10 ** 6),
      multipliedBy: 10 ** 6,
      timestamp: await timestampFromNow(100),
    };
    const signature = aweb3.eth.accounts.sign(message, XDC_ACCOUNT_2_PK);
    console.log({ signature });
    return signature;
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

  // NOT WORKING
  const withdrawCollateralXDC = async (e) => {
    e.preventDefault();
    if (!withdrawXDC) {
      toast.error("Please set a amount");
      return;
    }
    const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
    let tx = await NameContract.methods
      .withdrawCollateralXDC(parseInt(withdrawXDC))
      .send({ from: account });
    console.log(tx, "DONE");
  };

  const borrow = async (e) => {
    e.preventDefault();
    const { message: content, signature } = await singAMessage();

    console.log(content, signature);
    const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
    let tx = await NameContract.methods
      .borrow(amount, currency, content, signature)
      .send({ from: account });
    console.log(tx, "DONE");
  };

  return (
    <div className="mt-8 w-full p-4 md:w-1/2 mx-auto flex flex-col space-y-8">
      <button onClick={singAMessage}>Sign A message</button>
      <button onClick={getBlockNumber}>GET NUMBER</button>
      <p>Number is {number}</p>
      <form className="p-4 space-y-4" onSubmit={setBlockNumber}>
        <input
          type="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>

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
    </div>
  );
};

export default Home;
