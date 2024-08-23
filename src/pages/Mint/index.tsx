import { Button, message } from "antd";
import { useTonConnectUI, useTonAddress, CHAIN } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { claimProof } from "@/api";
import { Address, beginCell, toNano } from "@ton/ton";
import { TweetMint } from "@/api/TweetFi";
import { useTweetfiContract } from "@/context/useTweetfiContract";
import { useSender } from "@/context/useSender";
import { useSenderNotLogin } from "@/context/useSenderNotLogin";
import { Buffer } from "buffer";

const Mint = () => {
  const [tonConnectUI] = useTonConnectUI();
  const connectedAddress = useTonAddress();
  const tweetfi = useTweetfiContract();
  const { sender } = useSenderNotLogin();
  const [canMintAmount, setCanMintAmount] = useState(0);
  const [mintLoading, setMintLoading] = useState(false);
  const [canClaimAmount, setCanClaimAmount] = useState(0);
  const [claimLoading, setClaimLoading] = useState(false);

  const handleConnect = () => {
    tonConnectUI.openModal();
  };

  const handleMint = async () => {
    try {
      setMintLoading(true);
      const proofList = await claimProof();
      const proofIndex = proofList.data?.data?.findIndex?.(
        (item) =>
          Address.parse(item?.user?.address).toRawString() ===
          Address.parse(connectedAddress).toRawString()
      );
      const proof = proofList.data?.data?.[proofIndex];
      if (!proof) {
        message.error("Proof Not Found");
        throw new Error("no proof found");
      }
      const signature = Buffer.from(proof.signature, "base64");
      const signatureCell = beginCell().storeBuffer(signature).endCell();
      const args = {
        $$type: "TweetMint",
        index: BigInt(proof.claim_index),
        to: Address.parse(connectedAddress),
        amount: BigInt(parseInt(proof.amount)),
        signature: signatureCell,
      } as TweetMint;
      await tweetfi.send(sender, { value:  toNano(0.15) }, args);
    } catch (err) {
      message.error("Failed");
      console.log(err);
    } finally {
      setMintLoading(false);
    }
  };

  const getCanMintAmount = async () => {
    if(!connectedAddress) return;
    setMintLoading(true);
    try {
      const res = await claimProof();
      const proof = res.data?.data?.find?.(
        (item) =>
          Address.parse(item?.user?.address).toRawString() ===
          Address.parse(connectedAddress).toRawString()
      );
      setCanMintAmount(parseInt(proof?.amount ?? 0));
    } finally {
      setMintLoading(false);
    }
  };

  const handleClaim = async () => {
    try {
      setMintLoading(true);
      const proofList = await claimProof();
      const proofIndex = proofList.data?.data?.findIndex?.(
        (item) =>
          Address.parse(item?.user?.address).toRawString() ===
          Address.parse(connectedAddress).toRawString()
      );
      const proof = proofList.data?.data?.[proofIndex];
      if (!proof) {
        message.error("Proof Not Found");
        throw new Error("no proof found");
      }
      const signature = Buffer.from(proof.signature, "base64");
      const signatureCell = beginCell().storeBuffer(signature).endCell();
      const args = {
        $$type: "TweetMint",
        index: BigInt(proof.claim_index),
        to: Address.parse(connectedAddress),
        amount: BigInt(parseInt(proof.amount)),
        signature: signatureCell,
      } as TweetMint;
      await tweetfi.send(sender, { value:  toNano(0.15) }, args);
    } catch (err) {
      message.error("Failed");
      console.log(err);
    } finally {
      setMintLoading(false);
    }
  };

  const getCanClaimAmount = async () => {
    if(!connectedAddress) return;
    setMintLoading(true);
    try {
      const res = await claimProof();
      const proof = res.data?.data?.find?.(
        (item) =>
          Address.parse(item?.user?.address).toRawString() ===
          Address.parse(connectedAddress).toRawString()
      );
      setCanMintAmount(parseInt(proof?.amount ?? 0));
    } finally {
      setMintLoading(false);
    }
  };

  useEffect(() => {
    getCanMintAmount();
  }, [connectedAddress]);

  return (
    <div style={{ width: "100%", paddingBlock: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'column',
        }}
      >
        {connectedAddress ? (
          <>
          <div style={{borderRadius: 12, border: '1px solid #03FFFB', padding: 16}}>{connectedAddress}</div>
          <div style={{marginBlock: 24}}><span style={{color: '#a1a1a1'}}>Can Mint Amount:</span> {canMintAmount / 1e9}</div>
          <Button onClick={handleMint} type="primary" size="large" style={{width: 200}} loading={mintLoading}>
            Mint
          </Button>
          {/* <div style={{marginBlock: 24}}><span style={{color: '#a1a1a1'}}>Can Claim Amount:</span> {canClaimAmount / 1e9}</div>
          <Button onClick={handleClaim} type="primary" size="large" style={{width: 200}}>
            Claim
          </Button> */}
          </>
        ) : (
          <Button onClick={handleConnect} type="primary" size="large">
            Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
};

export default Mint;
