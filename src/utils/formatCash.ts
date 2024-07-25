export const formatCash = (n: number) => {
  if(typeof n !== 'number') return ;
  let obj = {num: 0, unit: ''}
  if (n < 1e3) obj = {num: n, unit: ''};
  else if (n < 1e6) obj = {num: (n / 1e3), unit: 'K'};
  else if (n < 1e9) obj = {num: (n / 1e6), unit: 'M'};
  else obj = {num: (n / 1e9), unit: 'B'};
  const preNum = Number.isInteger(obj.num) ? obj.num : Number(obj.num.toFixed(2))
  return {num: preNum, unit: obj.unit}
};
