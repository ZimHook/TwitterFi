import { Address, beginCell, toNano } from "@ton/ton";

export const createJettonTransferBody = (
  memo: string,
  amount: number,
  destination: string,
  response_destination: string
) => {
  const forwardPayload = beginCell()
    .storeUint(0, 32) // 0 opcode means we have a comment
    .storeStringTail(memo)
    .endCell();

  const body = beginCell()
    .storeUint(0xf8a7ea5, 32) // opcode for jetton transfer
    .storeUint(0, 64) // query id
    .storeCoins(amount) // jetton amount, amount * 10^9
    .storeAddress(Address.parse(destination)) // TON wallet destination address
    .storeAddress(Address.parse(response_destination)) // response excess destination
    .storeBit(0) // no custom payload
    .storeCoins(toNano(0.02)) // forward amount (if >0, will send notification message)
    .storeBit(1) // we store forwardPayload as a reference
    .storeRef(forwardPayload)
    .endCell();
  return body
};
