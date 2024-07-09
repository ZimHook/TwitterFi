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
    4564: { message: `Exceeded the daily mining limit` },
    9739: { message: `Sender is not a Jetton wallet` },
    10551: { message: `Only init_address is allowed to withdraw` },
    13105: { message: `JettonWallet: Not enough jettons to transfer` },
    15509: { message: `Only deployer is allowed to withdraw` },
    27831: { message: `Only owner can call this function` },
    27921: { message: `Only owner is allowed to withdraw` },
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
    {"name":"testMerkle","arguments":[{"name":"msg","type":{"kind":"simple","type":"TweetMint","optional":false}}],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"JettonData","optional":false}},
    {"name":"get_wallet_address","arguments":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const TweetFi_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"TweetMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalTweetMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MerkleRoot"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MerkleAdmin"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw safe"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TweetMint | InternalTweetMint | MerkleRoot | MerkleAdmin | 'withdraw safe' | JettonBurnNotification | JettonMint | Deploy) {
        
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
        if (message === 'withdraw safe') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
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
    
    async getTestMerkle(provider: ContractProvider, msg: TweetMint) {
        let builder = new TupleBuilder();
        builder.writeTuple(storeTupleTweetMint(msg));
        let source = (await provider.get('testMerkle', builder.build())).stack;
        let result = source.readString();
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