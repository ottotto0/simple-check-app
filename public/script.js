document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('text');
  const btn = document.getElementById('submitBtn');
  const result = document.getElementById('result');

  async function checkText() {
    const text = input.value;

    // 非同期でサーバーに POST。重い処理はサーバー側で行うのでクライアント負荷はほぼゼロ。
    try {
      const resp = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await resp.json();
      result.textContent = data.result || '失敗';
    } catch (err) {
      console.error(err);
      result.textContent = '失敗';
    }
  }

  btn.addEventListener('click', checkText);

  // Enter でも送信
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      checkText();
    }
  });
});
