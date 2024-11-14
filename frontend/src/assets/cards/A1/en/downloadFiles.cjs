const fs = require('fs');
const path = require('path');

// 이미지 다운로드 함수
async function downloadImage(id) {
  const idName = id.toString().padStart(3, '000');
  const response = await fetch(
    `https://static.dotgg.gg/pokepocket/card/A1-${idName}.webp`
  );

  if (!response.ok) return console.log('문제가 생겼습니다-' + idName);
  const arrayBuffer = await response.arrayBuffer();
  const typedBuffer = new Uint8Array(arrayBuffer);
  fs.writeFileSync(path.join(__dirname, 'A1-' + idName + '.webp'), typedBuffer);
  console.log(`Downloaded 'A1-${idName}'`);
}

// 이미지 다운로드 실행
(async () => {
  for (let id = 1; id <= 286; id++) {
    // 파일 이름 지정
    await downloadImage(id);
  }
})();
