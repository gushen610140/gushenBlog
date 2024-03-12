// 用于获取当前时间距离网站建立之初时间的差

export default () => {
  // 要注意月份是0开始的
  const startTime = new Date(2024,2,9)
  const curTime = new Date()

  const timeDiff = Math.abs(curTime.getTime() - startTime.getTime())

  // 计算相差的天数、小时数、分钟数和秒数
  const days = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // 构造时间差字符串
  let result = '';
  if (days > 0) {
      result += days + '天 ';
  }
  if (hours > 0) {
      result += hours + '小时 ';
  }
  if (minutes > 0) {
      result += minutes + '分钟 ';
  }
  if (seconds > 0) {
      result += seconds + '秒';
  }

  return result.trim()
}