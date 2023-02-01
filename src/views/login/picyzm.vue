<template>
  <div class="picyzm">
    <div class="s-canvas" @click.stop="handleClick"></div>
    <canvas id="s-canvas" :width="setOption.contentWidth" :height="setOption.contentHeight"></canvas>
  </div>
</template>
<script lang="ts" setup>
const setOption = ref<any>({
  backgroundColorMin: 200, // 验证码图片背景色最小值
  backgroundColorMax: 220, // 验证码图片背景色最大值
  contentWidth: 140, //容器宽度
  contentHeight: 45, //容器高度
  fontSizeMin: 20, // 字体最小值
  fontSizeMax: 30, // 字体最大值
});
const identifyCode = ref<Array<string>>([]);
// 子组件defineEmits暴露事件
const emit = defineEmits(['getIdentifyCode']);
watch(
  () => identifyCode.value,
  () => {
    // 触发组件更新
    drawPic();
  },
  {
    deep: true,
  }
);
onMounted(() => {
  const el: any = document.querySelector('.s-canvas');
  const width: number = el.offsetWidth;
  const height: number = el.offsetHeight;
  setOption.value.contentWidth = width;
  setOption.value.contentHeight = height;
  nextTick(() => {
    randomVC();
  });
});
//处理点击事件
function handleClick() {
  randomVC();
}
//随机生成验证码
function randomVC() {
  var arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  for (var i = 0; i < arr.length; i += 1) {
    var end = arr.length - 1;
    var index = (Math.random() * (end + 1)) >> 0;
    var t = arr[end];
    arr[end] = arr[index];
    arr[index] = t;
  }
  identifyCode.value = arr.slice(0, 4);
  //   子组件给父组件传值
  emit('getIdentifyCode', identifyCode.value);
}
function drawPic() {
  let canvas: any = document.getElementById('s-canvas');
  let ctx: any = canvas.getContext('2d');
  ctx.clearRect(0, 0, 300, 300);
  ctx.textBaseline = 'bottom';
  // 绘制随机背景;
  ctx.fillStyle = randomColor(setOption.value.backgroundColorMin, setOption.value.backgroundColorMax);
  ctx.fillRect(0, 0, setOption.value.contentWidth, setOption.value.contentHeight);
  // ctx.fillStyle = this.randomColor("100%", "100%");
  // ctx.fillRect(0, 0, "100%", "100%");
  // 绘制验证码
  for (let i = 0; i < identifyCode.value.length; i += 1) {
    drawText(ctx, identifyCode.value[i], i);
  }
  drawLine(ctx);
  drawDot(ctx);
}
//绘制验证码
function drawText(ctxT: any, txt, i) {
  let ctx: any = ctxT;
  ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
  ctx.font = randomNum(setOption.value.fontSizeMin, setOption.value.fontSizeMax) + 'px SimHei'; //随机生成字体大小
  let x = (i + 1) * (setOption.value.contentWidth / (identifyCode.value.length + 1));
  let y = randomNum(setOption.value.fontSizeMax, setOption.value.contentHeight - 5);
  var deg = randomNum(-30, 30);
  // 修改坐标原点和旋转角度
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.fillText(txt, 0, 0);
  // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 180);
  ctx.translate(-x, -y);
}
// 绘制干扰线
function drawLine(ctxT: any) {
  let ctx: any = ctxT;
  for (let i = 0; i < 4; i += 1) {
    ctx.strokeStyle = randomColor(100, 200);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, setOption.value.contentWidth), randomNum(0, setOption.value.contentHeight));
    ctx.lineTo(randomNum(0, setOption.value.contentWidth), randomNum(0, setOption.value.contentHeight));
    ctx.stroke();
  }
}
// 绘制干扰点
function drawDot(ctxT: any) {
  let ctx: any = ctxT;
  for (let i = 0; i < 30; i += 1) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(randomNum(0, setOption.value.contentWidth), randomNum(0, setOption.value.contentHeight), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
}
// 生成一个随机的颜色
function randomColor(min, max) {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
// 生成一个随机数
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
</script>
<style lang="scss" scoped>
.picyzm {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  cursor: pointer;
  position: relative;

  .s-canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    border: 1px solid #fff;
  }
}
</style>
