const fs = require('fs');
const path = require('path');

// 이미지 다운로드 함수
async function downloadImage(id) {
  const response = await fetch(
    `https://www.poke-tcg.com/_next/image?url=https%3A%2F%2Fd3srn7o0cx0b14.cloudfront.net%2Fcard%2Fa1-kr%2F${id}.webp&w=3840&q=75`
  );

  const idName = id.toString().padStart(3, '000');

  if (!response.ok) return console.log('문제가 생겼습니다-' + idName);
  const arrayBuffer = await response.arrayBuffer();
  const typedBuffer = new Uint8Array(arrayBuffer);
  fs.writeFileSync(path.join(__dirname, 'A1-' + idName + '.webp'), typedBuffer);
}

// 이미지 다운로드 실행
(async () => {
  for (let id = 1; id <= 286; id++) {
    // 파일 이름 지정
    await downloadImage(id);
    if (id % 30 === 0) console.log(`${id}-finish`);
  }
})();
