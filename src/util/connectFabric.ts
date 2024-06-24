import { Wallets, Gateway } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';

const channelName = 'channel1';
const chaincodeName = 'abstore';

const walletPath = path.join(process.cwd(), 'wallet');
const ccpPath = path.resolve(__dirname, '..', '..', 'connection-org1.json');
const org1UserId = 'appUser';

export async function send(type: boolean, func: string, args: string[]): Promise<string> {

    try {
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const gateway = new Gateway();

        try {
            await gateway.connect(ccp, {
                wallet,
                identity: org1UserId,
                discovery: { enabled: true, asLocalhost: false }
            });
            console.log('Success to connect network');

            const network = await gateway.getNetwork(channelName);
            console.log('Success to connect channel1');
            const contract = network.getContract(chaincodeName);
            let result: Buffer;
            if (type) {
                result = await contract.evaluateTransaction(func, ...args);
                return result.toString();
            } else {
                result = await contract.submitTransaction(func, ...args);
                if (result.length === 0){
                    return '';
                } else {
                    return result.toString();
                }
            }
        } catch (error) {
            throw error;
        } finally {
            gateway.disconnect();
        }
    } catch (error) {
        throw error;
    }
}