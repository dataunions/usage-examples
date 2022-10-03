import { DataUnionClient } from '@dataunions/client';
import { DataUnion } from '@dataunions/client/types/src/DataUnion';

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const DATA_UNION_ADDRESS = '';

const main = async () => {
  /** 1.) Set up the Data Union client with your desired chain */
  const DU = new DataUnionClient({
    auth: {
      privateKey: PRIVATE_KEY!,
    },
    chain: 'gnosis',
  });

  /** 2.) Get existing data union or run the deployment and add desired deployment options or leave as default (options can be changed later on too)*/
  let dataUnion: DataUnion;
  if (DATA_UNION_ADDRESS === '') {
    dataUnion = await DU.deployDataUnion();
  } else {
    dataUnion = await DU.getDataUnion(DATA_UNION_ADDRESS);
  }
  console.log('data union:', dataUnion);

  /** 3.) Manually add members to your data union */
  const ADD_MEMBER_ADDRESSES = [''];
  const tx1 = await dataUnion.addMembers(ADD_MEMBER_ADDRESSES);
  console.log('Members added:', tx1);

  // ---------- WITHDRAW

  /** 4.) AFTER token got send to the data union contract, refresh the revenue once
   * With purchases through the Streamr Marketplace this happens automatically
   */
  const tx2 = await dataUnion.refreshRevenue();
  console.log('Revenue refreshed:', tx2);

  /** 5.) Members and Admin can now withdraw their earnings from the contract (after each withdraw the contract will refresh its revenue automatically) */
  const tx3 = await dataUnion.withdrawAll();
  console.log('Withdrew all funds', tx3);

  /** 6.) Get Stats of the data union */
  const stats = await dataUnion.getStats();
};
