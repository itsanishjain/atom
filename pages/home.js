import React, { useState, useContext } from "react";
import { Web3ModalContext } from "../src/context/Web3ModalProvider";
import { contractAddress, contractABI } from "../src/utils/constants";

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

  return (
    <div className="mt-8 w-full p-4 md:w-1/2 mx-auto">
      <button onClick={getBlockNumber}>GET NUMBER</button>
      <p>Number is {number}</p>
      <form onSubmit={setBlockNumber}>
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
