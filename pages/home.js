import axios from "axios";
import React, { useState, useContext } from "react";
import { Web3ModalContext } from "../src/context/Web3ModalProvider";
import { contractAddress, contractABI } from "../src/utils/constants";

import { utils } from "ethers";

var newWeb3 = require("web3");

const Home = () => {
  const [number, setNumber] = useState(1);

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
    //TODO: blockchain calls
    console.log("SET funtion called");
    const NameContract = new web3.eth.Contract(contractABI, contractAddress);
    let tx = await NameContract.methods.store(number).send({ from: account });
    console.log(tx, "DONE");
  };

  const generateMessage = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const XDC_ACCOUNT_2_PK =
    "f3f7097ebda3883ecc6cf8bfb166cd3fa3ba6f8a9a54cf1873539a94e2827e9f";

  const singAMessage = async () => {
    console.log(newWeb3);
    var aweb3 = new newWeb3();

    // const signedMessage = await aweb3.eth.accounts
    //   .sign(generateMessage(), XDC_ACCOUNT_2_PK)
    //   .catch((e) => console.log(e));

    // let message = generateMessage();

    let response = await axios.get("/api/coinmarket");

    // console.log(response.data.result.data);

    let XDC_PRICE_USD = response.data.result.data[2634].quote.USD.price;

    // console.log(response.data.result.data[2634].quote.USD.price);

    // console.log(data.data.quote.USD.price);

    console.log("DONE");
    const message = {
      nonce: generateMessage(),
      price: parseInt((XDC_PRICE_USD * 10 ** 6).toString()),
      multipliedBy: 10 ** 6,
      timestamp: Date.now(),
    };

    var signature = aweb3.eth.accounts.sign(message, XDC_ACCOUNT_2_PK);

    console.log({ signature });
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
    </div>
  );
};

export default Home;
