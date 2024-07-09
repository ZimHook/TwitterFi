import { Dictionary, beginCell, Cell } from "@ton/core";

export function createProofCells(data) {

  // 初始化最内层的 cell
  let cell = beginCell()
      .storeUint(data[data.length - 1], 128)
      .endCell();

  // 从后向前构建嵌套 cell
  for (let i = data.length - 2; i >= 0; i--) {
      cell = beginCell()
          .storeRef(cell)
          .storeUint(data[i], 128)
          .endCell();
  }

  return cell;
}
