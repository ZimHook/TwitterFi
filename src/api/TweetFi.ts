import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    admin_address: Address;
    jetton_content: Cell;
    jetton_wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.admin_address);
        b_0.storeRef(src.jetton_content);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _mintable = sc_0.loadBit();
    let _admin_address = sc_0.loadAddress();
    let _jetton_content = sc_0.loadRef();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _admin_address = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.admin_address);
    builder.writeCell(source.jetton_content);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonMint = {
    $$type: 'JettonMint';
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonMint(src: JettonMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2310479113, 32);
        b_0.storeAddress(src.origin);
        b_0.storeAddress(src.receiver);
        b_0.storeInt(src.amount, 257);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2310479113) { throw Error('Invalid prefix'); }
    let _origin = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonMint(source: JettonMint) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.origin);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.amount);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonMint(): DictionaryValue<JettonMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMint(src.loadRef().beginParse());
        }
    }
}

export type Pool = {
    $$type: 'Pool';
    update_at: bigint;
    amount: bigint;
}

export function storePool(src: Pool) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.update_at, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadPool(slice: Slice) {
    let sc_0 = slice;
    let _update_at = sc_0.loadUintBig(32);
    let _amount = sc_0.loadCoins();
    return { $$type: 'Pool' as const, update_at: _update_at, amount: _amount };
}

function loadTuplePool(source: TupleReader) {
    let _update_at = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'Pool' as const, update_at: _update_at, amount: _amount };
}

function storeTuplePool(source: Pool) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.update_at);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserPool(): DictionaryValue<Pool> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePool(src)).endCell());
        },
        parse: (src) => {
            return loadPool(src.loadRef().beginParse());
        }
    }
}

export type TweetFiTransfer = {
    $$type: 'TweetFiTransfer';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_address: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTweetFiTransfer(src: TweetFiTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(773423688, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_address);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTweetFiTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 773423688) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_address = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TweetFiTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTweetFiTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_address = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TweetFiTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTweetFiTransfer(source: TweetFiTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_address);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTweetFiTransfer(): DictionaryValue<TweetFiTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTweetFiTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTweetFiTransfer(src.loadRef().beginParse());
        }
    }
}

export type Stake = {
    $$type: 'Stake';
    amount: bigint;
    inviter: Address;
}

export function storeStake(src: Stake) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3676380057, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.inviter);
    };
}

export function loadStake(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3676380057) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _inviter = sc_0.loadAddress();
    return { $$type: 'Stake' as const, amount: _amount, inviter: _inviter };
}

function loadTupleStake(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _inviter = source.readAddress();
    return { $$type: 'Stake' as const, amount: _amount, inviter: _inviter };
}

function storeTupleStake(source: Stake) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.inviter);
    return builder.build();
}

function dictValueParserStake(): DictionaryValue<Stake> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStake(src)).endCell());
        },
        parse: (src) => {
            return loadStake(src.loadRef().beginParse());
        }
    }
}

export type ShareRelease = {
    $$type: 'ShareRelease';
    origin: Address;
    amount: bigint;
}

export function storeShareRelease(src: ShareRelease) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2828676222, 32);
        b_0.storeAddress(src.origin);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadShareRelease(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2828676222) { throw Error('Invalid prefix'); }
    let _origin = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'ShareRelease' as const, origin: _origin, amount: _amount };
}

function loadTupleShareRelease(source: TupleReader) {
    let _origin = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'ShareRelease' as const, origin: _origin, amount: _amount };
}

function storeTupleShareRelease(source: ShareRelease) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.origin);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserShareRelease(): DictionaryValue<ShareRelease> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeShareRelease(src)).endCell());
        },
        parse: (src) => {
            return loadShareRelease(src.loadRef().beginParse());
        }
    }
}

export type Tip = {
    $$type: 'Tip';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    forward_payload: Cell;
}

export function storeTip(src: Tip) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(900237930, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTip(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 900237930) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'Tip' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, forward_payload: _forward_payload };
}

function loadTupleTip(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'Tip' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, forward_payload: _forward_payload };
}

function storeTupleTip(source: Tip) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTip(): DictionaryValue<Tip> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTip(src)).endCell());
        },
        parse: (src) => {
            return loadTip(src.loadRef().beginParse());
        }
    }
}

export type TransactionExistCheck = {
    $$type: 'TransactionExistCheck';
    origin: Address;
    to: Address;
    amount: bigint;
}

export function storeTransactionExistCheck(src: TransactionExistCheck) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1548997286, 32);
        b_0.storeAddress(src.origin);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadTransactionExistCheck(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1548997286) { throw Error('Invalid prefix'); }
    let _origin = sc_0.loadAddress();
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'TransactionExistCheck' as const, origin: _origin, to: _to, amount: _amount };
}

function loadTupleTransactionExistCheck(source: TupleReader) {
    let _origin = source.readAddress();
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'TransactionExistCheck' as const, origin: _origin, to: _to, amount: _amount };
}

function storeTupleTransactionExistCheck(source: TransactionExistCheck) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.origin);
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserTransactionExistCheck(): DictionaryValue<TransactionExistCheck> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransactionExistCheck(src)).endCell());
        },
        parse: (src) => {
            return loadTransactionExistCheck(src.loadRef().beginParse());
        }
    }
}

export type InternalTweetMint = {
    $$type: 'InternalTweetMint';
    txid: bigint;
    origin: Address;
    to: Address;
    amount: bigint;
}

export function storeInternalTweetMint(src: InternalTweetMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3069716963, 32);
        b_0.storeInt(src.txid, 257);
        b_0.storeAddress(src.origin);
        b_0.storeAddress(src.to);
        let b_1 = new Builder();
        b_1.storeInt(src.amount, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadInternalTweetMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3069716963) { throw Error('Invalid prefix'); }
    let _txid = sc_0.loadIntBig(257);
    let _origin = sc_0.loadAddress();
    let _to = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _amount = sc_1.loadIntBig(257);
    return { $$type: 'InternalTweetMint' as const, txid: _txid, origin: _origin, to: _to, amount: _amount };
}

function loadTupleInternalTweetMint(source: TupleReader) {
    let _txid = source.readBigNumber();
    let _origin = source.readAddress();
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'InternalTweetMint' as const, txid: _txid, origin: _origin, to: _to, amount: _amount };
}

function storeTupleInternalTweetMint(source: InternalTweetMint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.txid);
    builder.writeAddress(source.origin);
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserInternalTweetMint(): DictionaryValue<InternalTweetMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalTweetMint(src)).endCell());
        },
        parse: (src) => {
            return loadInternalTweetMint(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Cell;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonBurn = {
    $$type: 'JettonBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeJettonBurn(src: JettonBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleJettonBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleJettonBurn(source: JettonBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    }
}

export type JettonExcesses = {
    $$type: 'JettonExcesses';
    query_id: bigint;
}

export function storeJettonExcesses(src: JettonExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadJettonExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function loadTupleJettonExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function storeTupleJettonExcesses(source: JettonExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadJettonExcesses(src.loadRef().beginParse());
        }
    }
}

export type JettonInternalTransfer = {
    $$type: 'JettonInternalTransfer';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_address: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonInternalTransfer(src: JettonInternalTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_address);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonInternalTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_address = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonInternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_address = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonInternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonInternalTransfer(source: JettonInternalTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_address);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonInternalTransfer(): DictionaryValue<JettonInternalTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonInternalTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonInternalTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonBurnNotification = {
    $$type: 'JettonBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
}

export function storeJettonBurnNotification(src: JettonBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadJettonBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleJettonBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type WalletData = {
    $$type: 'WalletData';
    balance: bigint;
    owner: Address;
    jetton: Address;
    jetton_wallet_code: Cell;
}

export function storeWalletData(src: WalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

export function loadWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _jetton = sc_0.loadAddress();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}

function loadTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _jetton = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}

function storeTupleWalletData(source: WalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jetton);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}

function dictValueParserWalletData(): DictionaryValue<WalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
        }
    }
}

export type TweetMint = {
    $$type: 'TweetMint';
    index: bigint;
    to: Address;
    amount: bigint;
    proof: Cell;
    proof_length: bigint;
    to_str: string;
}

export function storeTweetMint(src: TweetMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2056413294, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.amount, 257);
        b_0.storeRef(src.proof);
        let b_1 = new Builder();
        b_1.storeInt(src.proof_length, 257);
        b_1.storeStringRefTail(src.to_str);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTweetMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2056413294) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _proof = sc_0.loadRef();
    let sc_1 = sc_0.loadRef().beginParse();
    let _proof_length = sc_1.loadIntBig(257);
    let _to_str = sc_1.loadStringRefTail();
    return { $$type: 'TweetMint' as const, index: _index, to: _to, amount: _amount, proof: _proof, proof_length: _proof_length, to_str: _to_str };
}

function loadTupleTweetMint(source: TupleReader) {
    let _index = source.readBigNumber();
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    let _proof = source.readCell();
    let _proof_length = source.readBigNumber();
    let _to_str = source.readString();
    return { $$type: 'TweetMint' as const, index: _index, to: _to, amount: _amount, proof: _proof, proof_length: _proof_length, to_str: _to_str };
}

function storeTupleTweetMint(source: TweetMint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    builder.writeCell(source.proof);
    builder.writeNumber(source.proof_length);
    builder.writeString(source.to_str);
    return builder.build();
}

function dictValueParserTweetMint(): DictionaryValue<TweetMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTweetMint(src)).endCell());
        },
        parse: (src) => {
            return loadTweetMint(src.loadRef().beginParse());
        }
    }
}

export type MerkleRoot = {
    $$type: 'MerkleRoot';
    value: string;
}

export function storeMerkleRoot(src: MerkleRoot) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2598927291, 32);
        b_0.storeStringRefTail(src.value);
    };
}

export function loadMerkleRoot(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2598927291) { throw Error('Invalid prefix'); }
    let _value = sc_0.loadStringRefTail();
    return { $$type: 'MerkleRoot' as const, value: _value };
}

function loadTupleMerkleRoot(source: TupleReader) {
    let _value = source.readString();
    return { $$type: 'MerkleRoot' as const, value: _value };
}

function storeTupleMerkleRoot(source: MerkleRoot) {
    let builder = new TupleBuilder();
    builder.writeString(source.value);
    return builder.build();
}

function dictValueParserMerkleRoot(): DictionaryValue<MerkleRoot> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMerkleRoot(src)).endCell());
        },
        parse: (src) => {
            return loadMerkleRoot(src.loadRef().beginParse());
        }
    }
}

export type MerkleAdmin = {
    $$type: 'MerkleAdmin';
    value: Address;
}

export function storeMerkleAdmin(src: MerkleAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1726930104, 32);
        b_0.storeAddress(src.value);
    };
}

export function loadMerkleAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1726930104) { throw Error('Invalid prefix'); }
    let _value = sc_0.loadAddress();
    return { $$type: 'MerkleAdmin' as const, value: _value };
}

function loadTupleMerkleAdmin(source: TupleReader) {
    let _value = source.readAddress();
    return { $$type: 'MerkleAdmin' as const, value: _value };
}

function storeTupleMerkleAdmin(source: MerkleAdmin) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.value);
    return builder.build();
}

function dictValueParserMerkleAdmin(): DictionaryValue<MerkleAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMerkleAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadMerkleAdmin(src.loadRef().beginParse());
        }
    }
}

 type TweetFi_init_args = {
    $$type: 'TweetFi_init_args';
    owner: Address;
    max_supply: bigint;
    admin: Address;
    jetton_content: Cell;
}

function initTweetFi_init_args(src: TweetFi_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.max_supply, 257);
        b_0.storeAddress(src.admin);
        b_0.storeRef(src.jetton_content);
    };
}

async function TweetFi_init(owner: Address, max_supply: bigint, admin: Address, jetton_content: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTweetFi_init_args({ $$type: 'TweetFi_init_args', owner, max_supply, admin, jetton_content })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TweetFi_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    2296: { message: `JettonWallet: Only Jetton master or Jetton wallet can call this function` },
    4396: { message: `Only for owner` },
    9739: { message: `Sender is not a Jetton wallet` },
    10551: { message: `Only init_address is allowed to withdraw` },
    13105: { message: `JettonWallet: Not enough jettons to transfer` },
    27831: { message: `Only owner can call this function` },
    29133: { message: `JettonWallet: Not allow negative balance after internal transfer` },
    29170: { message: `No permission` },
    30061: { message: `JettonMaster: Jetton is not mintable` },
    30081: { message: `Only for transaction validator` },
    34232: { message: `JettonWallet only` },
    35499: { message: `Only owner` },
    37185: { message: `Not enough funds to transfer` },
    39884: { message: `JettonWallet: Not enough jettons to tip` },
    42555: { message: `JettonWallet: Not enough jettons to` },
    42610: { message: `JettonMaster only` },
    43365: { message: `JettonMaster: Sender is not a Jetton owner` },
    45614: { message: `Only for merkle admin` },
    47048: { message: `JettonWallet: Only owner can burn tokens` },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
    61671: { message: `JettonWallet: Not enough jettons` },
    62429: { message: `Merkle verification failed.` },
}

const TweetFi_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"admin_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonMint","header":2310479113,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Pool","header":null,"fields":[{"name":"update_at","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TweetFiTransfer","header":773423688,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Stake","header":3676380057,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"inviter","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ShareRelease","header":2828676222,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Tip","header":900237930,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TransactionExistCheck","header":1548997286,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"InternalTweetMint","header":3069716963,"fields":[{"name":"txid","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"JettonInternalTransfer","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TweetMint","header":2056413294,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"proof","type":{"kind":"simple","type":"cell","optional":false}},{"name":"proof_length","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to_str","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"MerkleRoot","header":2598927291,"fields":[{"name":"value","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"MerkleAdmin","header":1726930104,"fields":[{"name":"value","type":{"kind":"simple","type":"address","optional":false}}]},
]

const TweetFi_getters: ABIGetter[] = [
    {"name":"get_max_supply","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"merkle_admin","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"merkle_tree_root","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"get_transaction_validator_address","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"JettonData","optional":false}},
    {"name":"get_wallet_address","arguments":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const TweetFi_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"TweetMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalTweetMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MerkleRoot"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MerkleAdmin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonBurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class TweetFi implements Contract {
    
    static async init(owner: Address, max_supply: bigint, admin: Address, jetton_content: Cell) {
        return await TweetFi_init(owner, max_supply, admin, jetton_content);
    }
    
    static async fromInit(owner: Address, max_supply: bigint, admin: Address, jetton_content: Cell) {
        const init = await TweetFi_init(owner, max_supply, admin, jetton_content);
        const address = contractAddress(0, init);
        return new TweetFi(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TweetFi(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TweetFi_types,
        getters: TweetFi_getters,
        receivers: TweetFi_receivers,
        errors: TweetFi_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TweetMint | InternalTweetMint | MerkleRoot | MerkleAdmin | JettonBurnNotification | JettonMint | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TweetMint') {
            body = beginCell().store(storeTweetMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalTweetMint') {
            body = beginCell().store(storeInternalTweetMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MerkleRoot') {
            body = beginCell().store(storeMerkleRoot(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MerkleAdmin') {
            body = beginCell().store(storeMerkleAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonBurnNotification') {
            body = beginCell().store(storeJettonBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonMint') {
            body = beginCell().store(storeJettonMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetMaxSupply(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_max_supply', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMerkleAdmin(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('merkle_admin', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getMerkleTreeRoot(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('merkle_tree_root', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getGetTransactionValidatorAddress(provider: ContractProvider, index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        let source = (await provider.get('get_transaction_validator_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetJettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadTupleJettonData(source);
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner_address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner_address);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}