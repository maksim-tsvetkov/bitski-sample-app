import { Web3Provider } from "@ethersproject/providers";
import { EthAddress, ImmutableXClient, messageTypes } from "@imtbl/imx-sdk";
// import { Bitski } from "bitski";
// eslint-disable-next-line import/no-extraneous-dependencies
import { BitskiEngine } from "bitski-provider";
import React, { FormEvent, useState } from "react";
import buildBitskiClient from "./client";
// import buildImxClient from "../imx/client";

const Setup = () => {
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [address, setAddress] = useState<any>();
  // eslint-disable-next-line no-unused-vars
  const [client, setClient] = useState<ImmutableXClient>();
  const [step, setStep] = useState<| "connectWallet"
    | "waitingBitskiConfirmation"
    | "waitingImxConfirmation"
    | "setupImx"
    | "complete">("connectWallet");
  const bitski = buildBitskiClient();

  // bitski
  //     .signIn()
  //     .then(() => {
  //         console.log('fully logged in and ready to use the wallet');
  //     })
  //     .catch((error) => {
  //         console.log('handle errors from login flow');
  //     });

  console.log({ bitski });

  // eslint-disable-next-line no-unused-vars
  const sleep = (milliseconds: number) => new Promise(resolve =>
      // eslint-disable-next-line no-promise-executor-return
       setTimeout(resolve, milliseconds)
    );

  const returnUserDetails = (publicAddress: EthAddress, message: any) => {
    console.log({ publicAddress, message });
    // parent.postMessage(
    //   {
    //     type: LINK_MESSAGE_TYPE,
    //     message,
    //     data: {
    //       address: publicAddress,
    //       starkPublicKey: imxClient?.starkPublicKey,
    //       providerPreference: "bitski",
    //       ethNetwork: config.ethNetwork
    //     }
    //   },
    //   "*"
    // );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setStep("waitingBitskiConfirmation");
      const signedUser = await bitski.signIn();
      console.log({ signedUser });
      // .then((user) => {
      //     console.log(user);
      // })
      // .catch((e) => {
      //     console.log('error: ', e);
      // });
      // await bitski.auth.loginWithBitskiLink({
      //     email,
      //     showUI: false,
      // });

      setStep("waitingImxConfirmation");
      const bitskiProvider: BitskiEngine = bitski.getProvider({
        networkName: "ropsten",
        network: {
          chainId: 3,
          rpcUrl:
            "https://eth-ropsten.alchemyapi.io/v2/ClYYSO4GujQgO379eSr_-oy6ngELUA0v"
        }
      });
      // const bitskiProvider: BitskiEngine = bitski.getProvider();
      // const imxClient = await buildImxClient(bitskiProvider as any, config.client);
      //
      // console.log({ imxClient });
      // //
      // // const user = await bitski.getUser();
      // //
      // // console.log({ user });
      // //
      // const publicAddress = signedUser?.accounts?.[0]?.toLowerCase() as EthAddress;
      //
      // setAddress(publicAddress);
      // console.log({ publicAddress });
      // //
      // const isRegistered = await imxClient.isRegistered({ user: publicAddress });
      // setClient(imxClient);
      // console.log({ isRegistered });
      // //
      // if (isRegistered) {
      //     returnUserDetails(publicAddress, imxClient, messageTypes.result);
      //     return;
      // }

      const provider = new Web3Provider(bitskiProvider as any);
      const signer = await provider.getSigner();
      await signer.signMessage("TEST1");
      // await sleep(1000);
      await signer.signMessage("TEST2");

      // bitskiProvider.get

      // await sleep(1000);

      // setStep('setupImx');
      //
      // await registerUser(publicAddress, imxClient);
    } catch (err) {
      console.error(err);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const register = async () =>
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
     registerUser(address, client!)
  ;

  const registerUser = async (
    publicAddress: EthAddress,
    imxClient: ImmutableXClient
  ) => {
    console.log("here");
    const result = await imxClient?.registerImx({
      etherKey: publicAddress,
      starkPublicKey: imxClient.starkPublicKey
    });

    console.log({ result });
    console.log("here2");

    returnUserDetails(publicAddress, messageTypes.success);

    setStep("complete");
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === "waitingBitskiConfirmation" && (
        <div>
          <h3>Check your email</h3>
          <p>
            <strong>Please, do not close this screen.</strong>
          </p>
        </div>
      )}
      {step === "waitingImxConfirmation" && (
        <div>
          <h3>Setup in progress...</h3>
          <p>Retrieving your account details, this may take some time.</p>

          <p>Please, do not close this screen.</p>
        </div>
      )}
      {step === "complete" && (
        <div>
          <h3>Success!</h3>
          <p>
            You can now buy, sell, and trade assets via Immutable X!
          </p>
        </div>
      )}
      {step === "connectWallet" && (
        <>
          <div>
            <h3>Connect with Bitski</h3>
            <p>
              Immutable X enables you to create a wallet and authenticate
              using Bitski.
            </p>
            <p>
              By providing your email and connecting to Bitski,{" "}
              <strong>
                you are agreeing to Bitski’s{" "}
                <a href="https://Bitski.link/legal/user-terms">
                  Terms of Service
                </a>
                , and{" "}
                <a href="https://Bitski.link/legal/privacy-policy">
                  Privacy Policy
                </a>
              </strong>
              .
            </p>
            <input title="Enter your email address"
                   onChange={({ target: { value } }) => setEmail(value)}
            />
          </div>
          <button type="submit">Connect</button>
        </>
      )}
    </form>
  );
};

export default Setup;
