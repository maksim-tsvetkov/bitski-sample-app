import { Web3Provider } from '@ethersproject/providers';
import { ExternalProvider } from '@ethersproject/providers/lib/web3-provider';
import { ImmutableXClient } from '@imtbl/imx-sdk';

const buildImxClient = async (externalProvider: ExternalProvider, config: any) => {
  const provider = new Web3Provider(externalProvider);
  const signer = await provider.getSigner();
  return ImmutableXClient.build({
    ...config,
    signer,
  });
};

export default buildImxClient;
